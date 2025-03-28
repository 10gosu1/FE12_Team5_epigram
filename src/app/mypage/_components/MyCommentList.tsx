'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/lib/Comment';
import { CommentList, Comment } from '@/types/Comment';
import { CommentItem } from '@/components/Comment/CommentItem';

export default function MyCommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);

  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU3NywidGVhbUlkIjoiMTItNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMTE4NjA1LCJleHAiOjE3NDMxMjA0MDUsImlzcyI6InNwLWVwaWdyYW0ifQ.u92whf7QMq2PjziwyNRhQTti_xvz4e3FfCpMJ5mjUj8';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (nextCursor === null) return;

        // 전체 댓글을 가져옵니다 (여기서는 100이 아니라 전체 댓글을 가져오는 코드로 수정됨)
        const response: CommentList = await getComments(testToken, 100, nextCursor);
        const userId = JSON.parse(atob(testToken.split('.')[1])).id;

        // 전체 댓글에서 내 댓글만 필터링
        const myComments: Comment[] = response.list.filter((comment: Comment) => Number(comment.writer.id) === userId);

        if (myComments.length === 0) return;

        setComments(myComments.slice(0, 4));
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [nextCursor]); // nextCursor가 변경되면 다시 실행

  return (
    <div className="w-full">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={testToken}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))} // 삭제 시 필터링
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))} // 수정 시 상태 업데이트
        />
      ))}
    </div>
  );
}
