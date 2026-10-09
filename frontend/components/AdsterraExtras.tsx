'use client';

import { useEffect, useRef, useState } from 'react';
import { NATIVE, POPUNDER_SRC, SMARTLINK_URL } from '@/lib/ads';

function addScript(src: string, parent: HTMLElement, async = true) {
  const s = document.createElement('script');
  s.src = src;
  s.async = async;
  s.setAttribute('data-cfasync', 'false');
  parent.appendChild(s);
  return s;
}

/** Adsterra Native Banner. One per page (its container id is fixed). Loads when scrolled near. */
export function NativeBanner({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShow(true); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setShow(true); io.disconnect(); } }, { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show || !ref.current) return;
    const slot = ref.current;
    const s = addScript(NATIVE.src, slot);
    return () => { s.remove(); };
  }, [show]);

  return (
    <div ref={ref} className={className} aria-label="Sponsored content">
      <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-ink-3">Sponsored</p>
      <div id={NATIVE.container} />
    </div>
  );
}

// Pages where people do their work. A popunder never runs on these.
const TOOL_PATHS = ['/icd10-intelligence', '/claim-scrubber', '/call-note-builder', '/em-audit-tool', '/audit', '/admin'];
const isToolPath = (path: string) => TOOL_PATHS.some((t) => path === t || path.startsWith(`${t}/`));
const POP_KEY = 'enh_pop_at';
const TOOL_USER_KEY = 'enh_tool_user';
const DAY = 24 * 60 * 60 * 1000;

const store = {
  get(k: string) { try { return window.localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { window.localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

type W = Window & { __enhPop?: boolean };

/**
 * Adsterra Popunder, rendered on blog articles only. To keep tool users happy:
 * - never loads for anyone who has used one of the tools (they're our core audience),
 * - at most once per 24 hours per browser,
 * - once loaded, links to a tool open with a full page load so the popunder script is gone there.
 */
export function Popunder() {
  useEffect(() => {
    const w = window as W;
    if (w.__enhPop) return;
    if (store.get(TOOL_USER_KEY)) return;
    const last = Number(store.get(POP_KEY) || 0);
    if (last && Date.now() - last < DAY) return;

    const t = window.setTimeout(() => {
      w.__enhPop = true;
      store.set(POP_KEY, String(Date.now()));
      addScript(POPUNDER_SRC, document.body, false);
      window.addEventListener('click', (e) => {
        const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
        if (!a || a.target === '_blank') return;
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin || !isToolPath(url.pathname)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        window.location.assign(url.href);
      }, true);
    }, 2500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}

/** Put on every tool page: marks the visitor as a tool user, and drops a popunder that came along from an article. */
export function ToolPageGuard() {
  useEffect(() => {
    store.set(TOOL_USER_KEY, '1');
    if ((window as W).__enhPop) window.location.reload();
  }, []);
  return null;
}

/** Adsterra Smartlink as a clearly labelled sponsored link (never disguised as article content). */
export function SmartlinkCard({ className = '' }: { className?: string }) {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`flex items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong bg-white px-5 py-4 text-sm hover:border-brand/50 ${className}`}
    >
      <span>
        <span className="mr-2 rounded bg-bg-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">Sponsored</span>
        <span className="font-medium text-ink-2">See today’s featured offer</span>
      </span>
      <span aria-hidden className="text-brand-ink">→</span>
    </a>
  );
}
