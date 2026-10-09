'use client';

import { useEffect, useRef, useState } from 'react';
import { ADS, type AdUnit } from '@/lib/ads';

/**
 * Renders one Adsterra unit inside its own iframe so several units can share a page
 * (their loader uses a global `atOptions`). The sandbox has no allow-top-navigation,
 * so an ad can't redirect the visitor away from the page. Loads only when the slot
 * scrolls near the viewport, with the space reserved to avoid layout shift.
 */
export default function AdSlot({ unit, className = '' }: { unit: AdUnit; className?: string }) {
  const ad = ADS[unit];
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShow(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect(); }
    }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const doc = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>
<script>atOptions={'key':'${ad.key}','format':'iframe','height':${ad.height},'width':${ad.width},'params':{}};<\/script>
<script src="${ad.host}/22/${ad.key}"><\/script></body></html>`;

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`} aria-label="Advertisement">
      <span className="mb-1 text-[10px] uppercase tracking-[0.15em] text-ink-3">Advertisement</span>
      <div style={{ width: ad.width, height: ad.height, maxWidth: '100%' }} className="overflow-hidden">
        {show && (
          <iframe
            title="Advertisement"
            srcDoc={doc}
            width={ad.width}
            height={ad.height}
            scrolling="no"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            style={{ border: 0, display: 'block' }}
          />
        )}
      </div>
    </div>
  );
}
