"use client";

import InfiniteList from "./InfiniteList";
import { Epigram } from "@/types/Epigram";

interface ApiResponse {
  list: Epigram[];
  nextCursor: number | null;
  totalCount: number;
}

async function fetchEpigrams(page: number, limit: number): Promise<{ list: Epigram[]; hasMore: boolean }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch epigrams');
    }
    const data: ApiResponse = await response.json();
    return {
      list: data.list,
      hasMore: data.nextCursor !== null
    };
  } catch (error) {
    console.error('Error fetching epigrams:', error);
    return {
      list: [],
      hasMore: false
    };
  }
}

export default function EpigramList() {
  return (
    <InfiniteList<Epigram>
      fetchItems={fetchEpigrams}
      renderItem={(epigram, index) => (
        <li key={`${epigram.id}-${index}`} className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{epigram.author}</h2>
          <p className="text-gray-600">{epigram.content}</p>
          {epigram.referenceUrl && (
            <a href={epigram.referenceUrl} className="text-blue-500">
              {epigram.referenceTitle}
            </a>
          )}
          <div className="text-sm text-gray-400">❤️ {epigram.likeCount} likes</div>
        </li>
      )}
    />
  );
}
