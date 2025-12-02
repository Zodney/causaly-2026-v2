/**
 * AppNavBar - Global Navigation Component
 *
 * Sticky top navigation bar that appears across all pages.
 * Features:
 * - Mock logo and navigation links
 * - Design System button and user profile menu
 * - Always displays in light/white theme
 * - Active route highlighting
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CausalyLogo } from "@/components/ui/CausalyLogo";
import { Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppNavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Agentic Research" },
    { href: "/scientific-search", label: "Scientific Search" },
    { href: "/bio-graph", label: "Bio Graph" },
    { href: "/pipeline-graph", label: "Pipeline Graph" },
  ];

  return (
    <nav className="sticky top-0 z-50 h-14 w-full border-b border-gray-200 bg-white dark:bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <CausalyLogo className="text-gray-900" />
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  pathname === item.href && "bg-gray-100 text-gray-900"
                )}
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Right: Design System + User Menu */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2" asChild>
            <Link href="/design-system">
              <Briefcase className="size-4" />
              Design System
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700"
                aria-label="User menu"
              >
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
