import type { Meta, StoryObj } from '@storybook/react-vite';
import SidebarMenu from './SidebarMenu';
import type { SidebarItem } from './SidebarMenu.types';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],
  args: {
    open: true,
    title: 'Navigation',
  },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

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

export const Default: Story = {
  args: {
    items,
    onClose: () => alert('Sidebar closed'),
  },
};
