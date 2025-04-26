import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeValues = ['dark', 'light', 'system'];

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
      root.classList.toggle('light', systemTheme === 'light');
      setResolvedTheme(systemTheme);
    } else {
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
      setResolvedTheme(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light';
      const root = window.document.documentElement;
      root.classList.toggle('dark', newTheme === 'dark');
      root.classList.toggle('light', newTheme === 'light');
      setResolvedTheme(newTheme);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  // Prevent FOUC (Flash of Unstyled Content)
  useEffect(() => {
    const initialTheme = localStorage.getItem('theme') || 'system';
    const root = window.document.documentElement;

    if (initialTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(initialTheme);
    }

    document.body.classList.remove('theme-loading');

    return () => {
      root.classList.remove('dark', 'light');
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}