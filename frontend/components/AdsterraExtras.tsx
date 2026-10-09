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

/** Adsterra Popunder. Loaded once per visit, only from pages that render this component (blog). */
export function Popunder() {
  useEffect(() => {
    const w = window as unknown as { __enhPop?: boolean };
    if (w.__enhPop) return;
    w.__enhPop = true;
    const t = window.setTimeout(() => addScript(POPUNDER_SRC, document.body, false), 2500);
    return () => window.clearTimeout(t);
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
