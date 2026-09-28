'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { adminApi, type AdminPost } from '@/lib/adminApi';

const CATEGORIES = ['Regulatory', 'Revenue Cycle', 'Coding', 'Denials', 'Payer Updates', 'Industry Trends', 'Career', 'Insights'];
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

type Form = { title: string; slug: string; seoTitle: string; description: string; category: string; coverImage: string };
const EMPTY: Form = { title: '', slug: '', seoTitle: '', description: '', category: 'Insights', coverImage: '' };

function ToolbarButton({ onClick, active, label, children }: { onClick: () => void; active?: boolean; label: string; children: React.ReactNode }) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onClick} title={label} aria-label={label} aria-pressed={active}
      className={`min-w-8 rounded-md px-2 py-1.5 text-sm font-semibold ${active ? 'bg-brand text-white' : 'text-ink-2 hover:bg-bg-soft'}`}>
      {children}
    </button>
  );
}

function Toolbar({ editor, onImage }: { editor: Editor | null; onImage: () => void }) {
  if (!editor) return null;
  const c = () => editor.chain().focus();
  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL (leave empty to remove)', prev || 'https://');
    if (url === null) return;
    if (!url || url === 'https://') c().extendMarkRange('link').unsetLink().run();
    else c().extendMarkRange('link').setLink({ href: url }).run();
  };
  return (
    <div className="z-10 flex flex-wrap items-center gap-1 border-b border-line bg-white/95 px-2 py-1.5 backdrop-blur">
      <ToolbarButton label="Heading" active={editor.isActive('heading', { level: 2 })} onClick={() => c().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton label="Subheading" active={editor.isActive('heading', { level: 3 })} onClick={() => c().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" />
      <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => c().toggleBold().run()}><b>B</b></ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => c().toggleItalic().run()}><i>I</i></ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive('underline')} onClick={() => c().toggleUnderline().run()}><u>U</u></ToolbarButton>
      <ToolbarButton label="Link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" />
      <ToolbarButton label="Bulleted list" active={editor.isActive('bulletList')} onClick={() => c().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => c().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => c().toggleBlockquote().run()}>“ ”</ToolbarButton>
      <ToolbarButton label="Divider" onClick={() => c().setHorizontalRule().run()}>—</ToolbarButton>
      <ToolbarButton label="Image" onClick={onImage}>🖼 Image</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" />
      <ToolbarButton label="Undo" onClick={() => c().undo().run()}>↶</ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => c().redo().run()}>↷</ToolbarButton>
    </div>
  );
}

export default function PostEditor({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === 'new';
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false, autolink: true } }),
      Image,
      Placeholder.configure({ placeholder: 'Start writing your article… Use H2 for sections and H3 for sub-points.' }),
    ],
    editorProps: { attributes: { class: 'prose-clinical min-h-[420px] px-5 py-6 outline-none sm:px-8' } },
    onUpdate: () => setDirty(true),
  });

  // Load existing post
  useEffect(() => {
    if (isNew || !editor) return;
    adminApi.get(id)
      .then((p) => {
        setForm({ title: p.title, slug: p.slug, seoTitle: p.seoTitle || '', description: p.description || '', category: p.category || 'Insights', coverImage: p.coverImage || '' });
        setStatus(p.status);
        editor.commands.setContent(p.contentHtml || '');
        setDirty(false);
      })
      .catch((e) => setMsg({ tone: 'err', text: e.message }))
      .finally(() => setLoading(false));
  }, [id, isNew, editor]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setDirty(true);
    setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !slugTouched ? { slug: slugify(v) } : {}) }));
  };

  const upload = useCallback(async (file: File) => {
    setMsg({ tone: 'ok', text: 'Uploading image…' });
    try { const url = await adminApi.upload(file); setMsg(null); return url; }
    catch (e: any) { setMsg({ tone: 'err', text: e.message }); return null; }
  }, []);

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f || !editor) return;
    const url = await upload(f);
    if (url) {
      const alt = window.prompt('Describe the image (alt text, for accessibility and SEO):', '') || '';
      editor.chain().focus().setImage({ src: url, alt }).run();
    }
  }
  async function onPickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    const url = await upload(f);
    if (url) { setForm((x) => ({ ...x, coverImage: url })); setDirty(true); }
  }

  async function save(nextStatus: 'draft' | 'published') {
    if (!editor) return;
    if (!form.title.trim()) { setMsg({ tone: 'err', text: 'Add a title first.' }); return; }
    if (nextStatus === 'published' && !form.description.trim()) { setMsg({ tone: 'err', text: 'Add a short description (it shows in Google results) before publishing.' }); return; }
    setSaving(true); setMsg(null);
    const body = { ...form, slug: form.slug || slugify(form.title), contentHtml: editor.getHTML(), status: nextStatus };
    try {
      const p = isNew ? await adminApi.create(body) : await adminApi.update(id, body);
      setStatus(p.status); setDirty(false);
      setForm((f) => ({ ...f, slug: p.slug }));
      setMsg({ tone: 'ok', text: p.status === 'published' ? 'Published! It will be live on the site within about a minute.' : 'Draft saved.' });
      if (isNew) router.replace(`/admin/posts/${p._id}`);
    } catch (e: any) {
      setMsg({ tone: 'err', text: e.status === 401 ? 'Your session expired — sign in again in another tab, then save.' : e.message });
    } finally { setSaving(false); }
  }

  const seoTitle = form.seoTitle || form.title;
  if (loading) return <p className="py-24 text-center text-ink-3">Loading article…</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm text-ink-3 hover:text-ink">← All articles</Link>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${status === 'published' ? 'bg-emerald-50 text-ok' : 'bg-warn-soft text-warn'}`}>{status === 'published' ? 'Published' : 'Draft'}</span>
          {dirty && <span className="text-xs text-ink-3">Unsaved changes</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {status === 'published' && !isNew && <a href={`/blog/${form.slug}`} target="_blank" rel="noopener" className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-2 hover:border-brand">View live</a>}
          {status === 'published' ? (
            <button disabled={saving} onClick={() => save('draft')} className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-2 hover:border-brand disabled:opacity-60">Unpublish</button>
          ) : (
            <button disabled={saving} onClick={() => save('draft')} className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-2 hover:border-brand disabled:opacity-60">Save draft</button>
          )}
          <button disabled={saving} onClick={() => save('published')} className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60">
            {saving ? 'Saving…' : status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {msg && <p role="status" className={`mb-5 rounded-lg px-3 py-2.5 text-sm ${msg.tone === 'ok' ? 'bg-emerald-50 text-ok' : 'bg-danger-soft text-danger'}`}>{msg.text}</p>}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-4">
          <input value={form.title} onChange={set('title')} placeholder="Article title" aria-label="Title"
            className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-2xl font-bold text-ink outline-none placeholder:text-slate-300 focus:border-brand sm:text-3xl" />
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <Toolbar editor={editor} onImage={() => fileRef.current?.click()} />
            <EditorContent editor={editor} />
          </div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={onPickImage} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <label className="block">
              <span className="field-label">URL</span>
              <div className="flex items-center rounded-[10px] border border-line-strong focus-within:border-brand">
                <span className="pl-3 text-sm text-ink-3">/blog/</span>
                <input className="min-w-0 flex-1 bg-transparent py-2.5 pr-3 text-sm outline-none" value={form.slug} onChange={(e) => { setSlugTouched(true); setDirty(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })); }} />
              </div>
              {status === 'published' && <span className="mt-1 block text-xs text-warn">Changing the URL of a published post breaks links to it.</span>}
            </label>
            <label className="block">
              <span className="field-label">Category</span>
              <select className="field" value={form.category} onChange={set('category')}>
                {Array.from(new Set([...CATEGORIES, form.category])).map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Description <span className={`float-right font-normal ${form.description.length > 160 ? 'text-danger' : 'text-ink-3'}`}>{form.description.length}/160</span></span>
              <textarea rows={3} className="field" value={form.description} onChange={set('description')} placeholder="One or two sentences. Shown in Google results and on the blog page." />
            </label>
            <label className="block">
              <span className="field-label">SEO title (optional) <span className={`float-right font-normal ${seoTitle.length > 60 ? 'text-danger' : 'text-ink-3'}`}>{seoTitle.length}/60</span></span>
              <input className="field" value={form.seoTitle} onChange={set('seoTitle')} placeholder="Defaults to the article title" />
            </label>
            <div>
              <span className="field-label">Cover image (optional)</span>
              {form.coverImage ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImage} alt="" className="w-full rounded-lg border border-line" />
                  <button type="button" onClick={() => { setForm((f) => ({ ...f, coverImage: '' })); setDirty(true); }} className="text-xs text-danger">Remove cover</button>
                </div>
              ) : (
                <button type="button" onClick={() => coverRef.current?.click()} className="w-full rounded-lg border border-dashed border-line-strong px-3 py-4 text-sm text-ink-3 hover:border-brand hover:text-brand-ink">Upload image</button>
              )}
              <input ref={coverRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={onPickCover} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">Google preview</p>
            <p className="truncate text-xs text-ink-3">enhancely.in › blog › {form.slug || 'your-article'}</p>
            <p className="mt-0.5 line-clamp-1 text-[1.05rem] text-[#1a0dab]">{seoTitle || 'Your article title'} | Enhancely</p>
            <p className="mt-0.5 line-clamp-2 text-sm text-ink-2">{form.description || 'Your description will appear here.'}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
