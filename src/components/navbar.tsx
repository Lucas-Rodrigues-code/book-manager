import { Book, User, LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Catálogo" },
    { href: "/admin", label: "Admin" },
  ];

  const buttons = [
    {
      href: "/profile",
      label: "Perfil",
      icon: <User className="mr-2 h-4 w-4" />,
      action: null,
    },
    {
      href: "#",
      label: "Sair",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      action: logout,
    },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold flex items-center">
          <Book className="mr-2" />
          BiblioTech
        </a>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-blue-200">
                  {link.label}
                </a>
              </li>
            ))}
            {buttons.map((link) => (
              <li key={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-blue-200"
                  onClick={link.action ? () => link.action() : undefined}
                >
                  {link.icon}
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none">
              <DropdownMenuSeparator />
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <a href={link.href} className="hover:text-blue-200">
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
              {buttons.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  onClick={link.action ? () => link.action() : undefined}
                >
                  {link.icon}
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
