"use client";

import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 z-40 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-100" />
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Orbit Talent
          </span>
        </div>

      </div>
    </nav>
  );
};
