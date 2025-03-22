"use client";

import InfiniteList from "./InfiniteList";
import { EpigramComment } from "@/types/Epigram";

interface ApiResponse {
  list: EpigramComment[];
  nextCursor: number | null;
  totalCount: number;
}

async function fetchComments(epigramId: number, page: number, limit: number): Promise<{ list: EpigramComment[]; hasMore: boolean }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${epigramId}/comments?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data: ApiResponse = await response.json();
    return {
      list: data.list,
      hasMore: data.nextCursor !== null
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return {
      list: [],
      hasMore: false
    };
  }
}

export default function CommentList({ epigramId }: { epigramId: number }) {
  return (
    <InfiniteList<EpigramComment>
      fetchItems={(page, limit) => fetchComments(epigramId, page, limit)}
      renderItem={(comment) => (
        <li key={comment.id} className="p-2 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <img src={comment.writer.image} alt={comment.writer.nickname} className="w-6 h-6 rounded-full" />
            <span className="text-sm font-medium">{comment.writer.nickname}</span>
          </div>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </li>
      )}
      buttonText="+ 최신 댓글 더보기"
    />
  );
}
