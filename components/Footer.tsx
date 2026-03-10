"use client";

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 pb-12 pt-12 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-sm">© 2026 Orbit Talent Systems</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Terms
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
