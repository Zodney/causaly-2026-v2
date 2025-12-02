"use client";

/**
 * AppThemeSwitcher - Theme toggle switch component
 *
 * A theme switcher using Switch component with Sun/Moon icons.
 * Follows the Kibo UI icon-based switch pattern.
 *
 * Usage in app routes:
 * ```tsx
 * import { AppThemeSwitcher } from "@/components/app/AppThemeSwitcher";
 *
 * <AppThemeSwitcher />
 * ```
 *
 * Features:
 * - Sun icon for light mode
 * - Moon icon for dark mode
 * - Smooth transitions
 * - Persists preference to localStorage
 * - SSR-safe (no hydration mismatch)
 *
 * Theming:
 * All colors use CSS variables from globals.css:
 * - Uses theme-aware border and background colors
 * - Icons adapt to theme automatically
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function AppThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid SSR/client mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 h-9 px-3">
        {/* Placeholder with same dimensions */}
        <div className="size-4" />
        <div className="w-11 h-6 rounded-full bg-muted" />
        <div className="size-4" />
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2 h-9 px-3 rounded-md bg-card">
      <Sun
        className="size-4 text-muted-foreground transition-colors"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
      />
      <Moon
        className="size-4 text-muted-foreground transition-colors"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}
