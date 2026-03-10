"use client";

import React from 'react';
import { FiX } from 'react-icons/fi';
import { User } from './ProfileCard';

interface ProfileDetailProps {
  user: User | null;
  isEnriching?: boolean;
  onClose: () => void;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({ user, isEnriching, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-950">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <FiX size={20} />
        </button>
        
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-3xl bg-zinc-100 p-1 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
              <img src={user.avatar} alt={user.name} className="h-full w-full rounded-[1.25rem] object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{user.name}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{user.role}</p>
            <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">{user.organization}</div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">About</h4>
              {isEnriching ? (
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                </div>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {user.bio}
                </p>
              )}
            </div>
            
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Contact</h4>
              {isEnriching ? (
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              ) : (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{user.email}</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex h-11 items-center justify-center rounded-xl bg-zinc-900 font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
              View Full Profile
            </button>
            <button className="flex h-11 items-center justify-center rounded-xl border border-zinc-200 font-medium text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
