import { useState } from 'react';
import Input from './components/Input/Input';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import Toast from './components/Toast/Toast';
import { ToastViewport } from './components/Toast/ToastViewport';
import type { SidebarItem } from './components/SidebarMenu/SidebarMenu.types';

export default function App() {
  // Input demo
  const [text, setText] = useState('');
  const [pwd, setPwd] = useState('');

  // Sidebar demo
  const [menuOpen, setMenuOpen] = useState(false);
  const items: SidebarItem[] = [
    { id: '1', label: 'Dashboard', href: '#' },
    {
      id: '2',
      label: 'Projects',
      children: [
        { id: '2-1', label: 'Project A', href: '#' },
        {
          id: '2-2',
          label: 'More',
          children: [
            { id: '2-2-1', label: 'Nested A', href: '#' },
            { id: '2-2-2', label: 'Nested B', href: '#' },
          ],
        },
      ],
    },
  ];

  // Toast demo
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">UI Demo</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Open Sidebar
          </button>
          <button
            onClick={() => {
              setToastOpen(false);
              setTimeout(() => setToastOpen(true), 0);
            }}
            className="rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-black"
          >
            Show Toast
          </button>
        </div>
      </header>

      <main className="grid max-w-2xl gap-4">
        <Input
          label="Text"
          placeholder="Your name"
          clearable
          value={text}
          onChange={setText}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••"
          clearable
          value={pwd}
          onChange={setPwd}
        />
        <Input label="Number" type="number" placeholder="123" />
        <Input label="With error" placeholder="Invalide" error="Something went wrong" />
      </main>

      <SidebarMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
        title="Navigation"
        width={320}
      />

      <ToastViewport>
        <Toast
          open={toastOpen}
          type="success"
          message="Saved successfully!"
          duration={2000}
          onClose={() => setToastOpen(false)}
        />
      </ToastViewport>
    </div>
  );
}

