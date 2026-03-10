import axios from 'axios';
import { User } from '@/components/ProfileCard';
import { TorreSearchStreamEntity } from "./types";

const BASE_URL = "https://torre.ai/api";

export async function searchTorreUsers(query: string, limit: number = 20, onUpdate?: (users: User[]) => void): Promise<User[]> {
  if (!query) return [];

  try {
    const response = await fetch(`${BASE_URL}/entities/_searchStream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        identityType: "person",
        limit,
        meta: true,
        excludeContacts: true,
      }),
    });

    if (!response.ok) throw new Error('Search failed');

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const results: User[] = [];
    const decoder = new TextDecoder();
    let partialChunk = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = (partialChunk + chunk).split('\n');
      partialChunk = lines.pop() || '';

      const batch: User[] = [];
      for (const line of lines) {
        if (line.trim()) {
          try {
            const data: TorreSearchStreamEntity = JSON.parse(line);
            const user: User = {
              id: data.ggId || data.ardaId.toString(),
              name: data.name,
              role: data.professionalHeadline,
              avatar:
                data.imageUrl || `https://i.pravatar.cc/150?u=${data.username}`,
              username: data.username,
              organization: data.locationName || "",
            };
            results.push(user);
            batch.push(user);
          } catch (e) {
            console.error('Error parsing line:', e);
          }
        }
      }
      
      if (batch.length > 0 && onUpdate) {
        onUpdate([...results]);
      }
    }

    return results;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
}

export async function getTorreProfile(username: string) {
  const response = await axios.get(`${BASE_URL}/genome/bios/${username}`);
  return response.data;
}
