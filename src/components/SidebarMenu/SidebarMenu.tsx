import { useEffect, useMemo, useState } from 'react';
import type { SidebarItem, SidebarMenuProps } from './SidebarMenu.types';

export default function SidebarMenu({
  open,
  items,
  onClose,
  title = 'Menu',
  width = 320,
}: SidebarMenuProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) setExpanded(new Set());
  }, [open]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const panelStyle = useMemo(
    () => ({ width: typeof width === 'number' ? `${width}px` : width }),
    [width],
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={[
          'fixed right-0 top-0 z-50 h-full transform bg-white shadow-2xl transition-transform',
          open ? 'translate-x-0' : 'translate-x-full',
          'flex flex-col',
        ].join(' ')}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar menu"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <MenuList items={items} expanded={expanded} onToggle={toggle} />
        </nav>
      </aside>
    </>
  );
}

function MenuList({
  items,
  expanded,
  onToggle,
}: {
  items: SidebarItem[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          {item.children && item.children.length > 0 ? (
            <div>
              <button
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-800 hover:bg-gray-50"
                onClick={() => onToggle(item.id)}
                aria-expanded={expanded.has(item.id)}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={[
                    'h-4 w-4 transform transition-transform',
                    expanded.has(item.id) ? 'rotate-90' : '',
                  ].join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <div
                className={[
                  'ml-3 overflow-hidden transition-[max-height]',
                  expanded.has(item.id) ? 'max-h-96' : 'max-h-0',
                ].join(' ')}
              >
                <ul className="mt-1 space-y-1 border-l pl-3">
                  {item.children.map((child) =>
                    child.children && child.children.length > 0 ? (
                      <MenuList
                        key={child.id}
                        items={[child]}
                        expanded={expanded}
                        onToggle={onToggle}
                      />
                    ) : (
                      <li key={child.id}>
                        <MenuLeaf item={child} />
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <MenuLeaf item={item} />
          )}
        </li>
      ))}
    </ul>
  );
}

function MenuLeaf({ item }: { item: SidebarItem }) {
  const content = (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-800 hover:bg-gray-50">
      {item.icon}
      <span>{item.label}</span>
    </div>
  );
  return item.href ? (
    <a href={item.href} className="block">
      {content}
    </a>
  ) : (
    <button className="block w-full text-left">{content}</button>
  );
}
