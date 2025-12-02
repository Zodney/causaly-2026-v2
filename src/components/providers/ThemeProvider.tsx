"use client";

/**
 * ThemeProvider - Application theme management
 *
 * Wraps the app to provide theme switching capabilities using next-themes.
 * Handles SSR hydration and persists theme preference to localStorage.
 *
 * Usage in root layout:
 * ```tsx
 * import { ThemeProvider } from "@/components/providers/ThemeProvider";
 *
 * <ThemeProvider>
 *   <body>
 *     {children}
 *   </body>
 * </ThemeProvider>
 * ```
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
