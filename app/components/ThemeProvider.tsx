"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Buộc chuyển sang chế độ tối khi tải trang
  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Khi làm điều này, cần phải đảm bảo rằng theme sẽ được đồng bộ trong state của next-themes
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 