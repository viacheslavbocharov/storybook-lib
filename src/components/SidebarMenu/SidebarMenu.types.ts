export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

export type SidebarMenuProps = {
  open: boolean;
  items: SidebarItem[];
  onClose: () => void;
  title?: string;
  width?: number | string;
};
