'use client';

import { useServerInsertedHTML } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'] as const;
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

// 防 FOUC：仅在 SSR HTML 流中注入，客户端 React 不再渲染 <script>
const THEME_INIT_SCRIPT = `(function(){
  var storageKey = ${JSON.stringify(STORAGE_KEY)};
  var defaultTheme = "system";
  var themes = ${JSON.stringify(THEMES)};
  var el = document.documentElement;
  function setTheme(name) {
    el.classList.remove.apply(el.classList, themes);
    if (name) el.classList.add(name);
    if (name === "light" || name === "dark") el.style.colorScheme = name;
  }
  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  try {
    var stored = localStorage.getItem(storageKey) || defaultTheme;
    setTheme(stored === "system" ? systemTheme() : stored);
  } catch (e) {}
})()`;

type ThemeContextValue = {
  theme?: string;
  setTheme: (theme: string | ((prev: string) => string)) => void;
  resolvedTheme?: string;
  systemTheme?: 'dark' | 'light';
  themes: string[];
};

const ThemeContext = createContext<ThemeContextValue>({
  setTheme: () => {},
  themes: [...THEMES, 'system']
});

export function useTheme() {
  return useContext(ThemeContext);
}

type Props = {
  children: ReactNode;
};

// 替代 next-themes，避免 React 19 的 <script> 警告
export default function ThemeProvider({ children }: Props) {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
      suppressHydrationWarning
    />
  ));

  const [theme, setThemeState] = useState('system');
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((nextTheme: string, disableTransition: boolean) => {
    const resolved =
      nextTheme === 'system'
        ? window.matchMedia(MEDIA_QUERY).matches
          ? 'dark'
          : 'light'
        : nextTheme;

    let cleanup: (() => void) | undefined;
    if (disableTransition) {
      const style = document.createElement('style');
      style.appendChild(
        document.createTextNode(
          '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
        )
      );
      document.head.appendChild(style);
      cleanup = () => {
        window.getComputedStyle(document.body);
        setTimeout(() => document.head.removeChild(style), 1);
      };
    }

    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;

    cleanup?.();
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      setThemeState(localStorage.getItem(STORAGE_KEY) || 'system');
    } catch {
      // localStorage 不可用时保持默认主题
    }

    const media = window.matchMedia(MEDIA_QUERY);
    const updateSystemTheme = () => {
      setSystemTheme(media.matches ? 'dark' : 'light');
    };

    updateSystemTheme();
    media.addEventListener('change', updateSystemTheme);
    return () => media.removeEventListener('change', updateSystemTheme);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme, true);
  }, [theme, mounted, applyTheme, systemTheme]);

  const setTheme = useCallback((value: string | ((prev: string) => string)) => {
    setThemeState((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: mounted ? theme : undefined,
      setTheme,
      resolvedTheme: mounted ? resolvedTheme : undefined,
      systemTheme: mounted ? systemTheme : undefined,
      themes: [...THEMES, 'system']
    }),
    [mounted, theme, setTheme, resolvedTheme, systemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
