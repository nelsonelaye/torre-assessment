"use client";

import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { ProfileCard, User } from './ProfileCard';
import { ProfileDetail } from './ProfileDetail';
import { getTorreProfile, searchTorreUsers } from '@/lib/api';
import { FiSearch, FiUserX, FiHome } from 'react-icons/fi';

export const SearchExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [streamingResults, setStreamingResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [debouncedQuery] = useDebounce(searchQuery, 750);

  const { isLoading, isFetching } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchTorreUsers(debouncedQuery, 20, (updatedResults) => {
      setStreamingResults(updatedResults);
    }),
    enabled: !!debouncedQuery,
    gcTime: 0,
  });

  useEffect(() => {
    if (!debouncedQuery) {
      setStreamingResults([]);
    }
  }, [debouncedQuery]);

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', selectedUser?.username],
    queryFn: () => getTorreProfile(selectedUser!.username!),
    enabled: !!selectedUser?.username,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const enrichedUser = React.useMemo(() => {
    if (!selectedUser) return null;
    if (!profileData) return selectedUser;
    
    return {
      ...selectedUser,
      bio: profileData.person?.summary || profileData.person?.summaryOfInterests || "No bio available.",
      email: profileData.person?.email || "Email not public.",
      organization: profileData.person?.location?.name || selectedUser.organization
    };
  }, [selectedUser, profileData]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const isSearching = isFetching || (isLoading && !!debouncedQuery);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Search Bar Section */}
      <div className="relative">
        <div className="group relative overflow-hidden rounded-2xl bg-white p-1 ring-1 ring-zinc-200 transition-all focus-within:ring-2 focus-within:ring-zinc-900 dark:bg-zinc-900 dark:ring-zinc-800 dark:focus-within:ring-zinc-100">
          <div className="flex items-center px-4 py-3">
            <FiSearch 
              size={20}
              strokeWidth={2.5}
              className={`mr-3 transition-colors ${isSearching ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}
            />
            <input
              type="text"
              placeholder="Search talent on Torre.ai..."
              className="w-full bg-transparent text-lg font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <div className="flex items-center gap-1 ml-2">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-900 [animation-delay:-0.3s] dark:bg-zinc-100" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-900 [animation-delay:-0.15s] dark:bg-zinc-100" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-900 dark:bg-zinc-100" />
              </div>
            )}
          </div>
        </div>
        
        {/* Search Helper text */}
        <div className="mt-3 flex gap-2 text-xs text-zinc-400">
          <span>Try:</span>
          <button onClick={() => setSearchQuery('Renan Peixoto')} className="hover:text-zinc-950 dark:hover:text-zinc-100 underline decoration-zinc-200 underline-offset-2 transition-colors">Renan Peixoto</button>
          <button onClick={() => setSearchQuery('Frontend Developer')} className="hover:text-zinc-950 dark:hover:text-zinc-100 underline decoration-zinc-200 underline-offset-2 transition-colors">Frontend Developer</button>
          <button onClick={() => setSearchQuery('Product Designer')} className="hover:text-zinc-950 dark:hover:text-zinc-100 underline decoration-zinc-200 underline-offset-2 transition-colors">Product Designer</button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {debouncedQuery && (
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              {isSearching && streamingResults.length === 0 ? 'Loading results...' : `${streamingResults.length} Results found`}
            </h2>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-1">
          {streamingResults.map((user: User, idx: number) => (
            <div 
              key={`${user.id}-${idx}`} 
              className="animate-in fade-in slide-in-from-top-2 duration-300 fill-mode-both"
              style={{ animationDelay: `${Math.min(idx * 50, 500)}ms` }}
            >
              <ProfileCard 
                user={user} 
                onSelect={handleSelectUser} 
              />
            </div>
          ))}

          {debouncedQuery && streamingResults.length === 0 && !isSearching && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                <FiUserX size={32} className="text-zinc-300 dark:text-zinc-700" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No matches found</h3>
              <p className="mt-1 text-sm text-zinc-500">We couldn't find anyone matching "{debouncedQuery}"</p>
            </div>
          )}
          
          {!debouncedQuery && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
               <div className="relative mb-6">
                <div className="absolute -inset-4 animate-pulse rounded-full bg-zinc-100/50 dark:bg-zinc-800/50" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                  <FiHome size={40} className="text-zinc-900 dark:text-zinc-100" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Search for team members</h3>
              <p className="mt-2 max-w-xs text-sm text-zinc-500">
                Type a name, role, or department above to explore talent on Torre.ai.
              </p>
            </div>
          )}
        </div>
      </div>

      <ProfileDetail 
        user={enrichedUser}
        isEnriching={isProfileLoading}
        onClose={() => {
          setSelectedUser(null);
        }} 
      />
    </div>
  );
};
