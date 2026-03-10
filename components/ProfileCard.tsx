"use client";

import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  organization?: string;
  email?: string;
  bio?: string;
  username?: string;
}

interface ProfileCardProps {
  user: User;
  onSelect: (user: User) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(user)}
      className="group relative flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.role}</p>
        <span className="mt-1 inline-block text-[10px] font-medium text-zinc-400 uppercase tracking-wider">{user.organization}</span>
      </div>
      <div className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <FiChevronRight size={16} className="text-zinc-400" />
      </div>
    </div>
  );
};
