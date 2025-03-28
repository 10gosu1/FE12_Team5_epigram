// 코멘트 API

import { CommentList } from '@/types/Comment';

// 댓글 작성
export async function createComment(token: string, epigramId: number, content: string, isPrivate: boolean) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ epigramId, isPrivate, content }),
  });

  if (!response.ok) throw new Error('댓글 작성 실패');
  return await response.json();
}

// 댓글 목록 조회
export async function getComments(token: string, limit: number, cursor: number, epigramId?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/comments?limit=${limit}&cursor=${cursor}`;
  if (epigramId) {
    url += `&epigramId=${epigramId}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('댓글 불러오기 실패');
  const data: CommentList = await response.json();
  return data;
}

// 댓글 수정
export async function updateComment(token: string, commentId: number, content: string, isPrivate: boolean) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, isPrivate }),
  });

  if (!response.ok) throw new Error('댓글 수정 실패');
  return await response.json();
}

// 댓글 삭제
export async function deleteComment(token: string, commentId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('댓글 삭제 실패');
  return await response.json();
}
