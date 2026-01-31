import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import PageFooter from "./PageFooter";
import "../styles/mainPage.scss";

/**
 * AutoPaginatedSections
 * Props:
 * - blocks: ReactNode[]               // content blocks to paginate
 * - startPage?: number                // starting page number (default 1)
 * - pageWidth?: number                // px (default 794)
 * - pageHeight?: number               // px (default 802)
 * - pagePadding?: number              // px (default 10)
 * - HeaderComponent?: ReactComponent  // optional header to render on each page
 * - contentClassName?: string         // optional inner wrapper class (default 'content-page')
 */
const AutoPaginatedSections = ({
  blocks = [],
  startPage = 1,
  pageWidth = 794,
  pageHeight = 802,
  pagePadding = 10,
  HeaderComponent,
  paddingLeft = 0,
  contentClassName = "content-page",
}) => {
  const USABLE_HEIGHT = useMemo(
    () => pageHeight - pagePadding * 2,
    [pageHeight, pagePadding],
  );

  const [heights, setHeights] = useState([]);
  const [pages, setPages] = useState([]);
  const [measured, setMeasured] = useState(false);

  const isBrowser =
    typeof document !== "undefined" && typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) {
      setMeasured(true);
      return;
    }
    let isMounted = true;
    if (!blocks.length) {
      setHeights([]);
      setMeasured(true);
      return;
    }

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.style.width = `${pageWidth}px`;
    container.style.left = "-99999px";
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
      <div className={contentClassName}>
        {blocks.map((b, i) => (
          <div key={i} data-blockindex={i}>
            {b}
          </div>
        ))}
      </div>,
    );

    const measure = () => {
      const content = container.firstElementChild;
      if (!content) return done();
      const nodes = Array.from(content.children);
      const hs = nodes.map((node) => node.offsetHeight || 0);
      setHeights(hs);
      setMeasured(true);
      done();
    };

    const done = () => {
      try {
        root.unmount();
      } catch {}
      if (container.parentNode) container.parentNode.removeChild(container);
    };

    requestAnimationFrame(measure);

    return () => {
      isMounted = false;
      try {
        root.unmount();
      } catch {}
      if (container.parentNode) container.parentNode.removeChild(container);
    };
  }, [blocks, pageWidth, pagePadding, contentClassName, isBrowser]);

  useEffect(() => {
    if (!heights.length) return;
    const out = [];
    let current = [];
    let used = 0;

    heights.forEach((h, i) => {
      if (used + h > USABLE_HEIGHT && current.length) {
        out.push(current);
        current = [];
        used = 0;
      }
      current.push(blocks[i]);
      used += h;
    });

    if (current.length) out.push(current);
    setPages(out);
  }, [heights, USABLE_HEIGHT, blocks]);

  if (!pages.length) {
    return (
      <section className="section-page pdf-section">
        <div
          className={contentClassName}
          style={
            {
              // padding: `${pagePadding}px`,
              // paddingLeft: `${paddingLeft}px`,
            }
          }
        >
          {HeaderComponent ? <HeaderComponent /> : null}
          {blocks.map((b, i) => (
            <div style={{ paddingLeft: `${paddingLeft}px` }} key={i}>
              {b}
            </div>
          ))}
        </div>
        <PageFooter pageNumber={startPage} />
      </section>
    );
  }

  return (
    <div>
      {pages.map((pageBlocks, i) => (
        <section key={i} className="section-page pdf-section">
          <div
            className={contentClassName}
            style={
              {
                // padding: `${pagePadding}px`,
                // paddingLeft: `${paddingLeft}px`,
              }
            }
          >
            {HeaderComponent ? <HeaderComponent /> : null}
            {pageBlocks.map((block, j) => (
              <div style={{ paddingLeft: `${paddingLeft}px` }} key={j}>
                {block}
              </div>
            ))}
          </div>
          <PageFooter pageNumber={startPage + i} />
        </section>
      ))}
    </div>
  );
};

export default AutoPaginatedSections;
