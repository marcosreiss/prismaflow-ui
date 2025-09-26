import type { NavItem } from "@/design-system/components/pfsidebar/PFSidebar";

export const navData: NavItem[] = [
  { title: "Página Inicial", path: "/", icon: "Home" },
  {
    title: "Cadastros",
    icon: "Folder",
    children: [
      { title: "Clientes", path: "/clientes", icon: "User" },
      { title: "Produtos", path: "/produtos", icon: "Box" },
    ],
  },
  { title: "Gestão", path: "/gestao", icon: "Settings" },
  { title: "Relatórios", path: "/relatorios", icon: "BarChart" },
];
