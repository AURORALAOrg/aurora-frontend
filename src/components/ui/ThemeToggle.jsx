import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
    
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? (
        <ComputerDarkIcon />
      ) : (
        <ComputerLightIcon />
      );
    }
    
    return theme === 'dark' ? <MoonIcon /> : <SunIcon />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'System theme';
    return theme === 'dark' ? 'Dark theme' : 'Light theme';
  };

  return (
    <button
      onClick={handleThemeChange}
      className={clsx(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-md border',
        'transition-all duration-300 ease-in-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'border-neutral-200 hover:bg-neutral-100 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-600',
        animating && 'animate-pulse'
      )}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span
        className={clsx(
          'absolute transition-transform duration-500',
          animating && 'animate-spin'
        )}
      >
        {getIcon()}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-500"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ComputerLightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-500"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function ComputerDarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-400"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}