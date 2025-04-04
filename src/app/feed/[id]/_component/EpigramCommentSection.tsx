'use client';

import { useEffect, useRef, useState } from 'react';
import EpigramCommentList from './EpigramCommentList';
import { createComment } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import CommentCount from './CommentCount';
import CommentInput from './CommentInput';
import { useSession } from 'next-auth/react';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { useParams } from 'next/navigation';
import { getEpigramComments } from '@/lib/Epigram';

export default function EpigramCommentSection() {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const epigramId = Number(id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [cursor, setCursor] = useState<number | null>(null); // 마지막 댓글 id
  const [hasMore, setHasMore] = useState(true); // 더 불러올 댓글이 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const token = session?.user.accessToken;
  const userImage = session?.user?.image;

  useEffect(() => {
    if (!token || !epigramId || Number.isNaN(epigramId)) return;

    const fetchInital = async () => {
      try {
        const res = await getEpigramComments(token, epigramId, 3);

        setComments(res.list);
        setTotalCount(res.totalCount);

        if (res.list.length < 3) {
          setHasMore(false);
        } else {
          const lastId = res.list[res.list.length - 1].id;
          setCursor(lastId); // 다음 커서 설정
        }
      } catch (err) {
        console.error('댓글 초기 불러오기 실패', err);
      }
    };

    fetchInital();
  }, [epigramId, token]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (!hasMore || isLoading) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreComments();
        }
      },
      { threshold: 1.0, rootMargin: '200px' },
    );
    if (observerRef.current) {
      observer.current.observe(observerRef.current);
    }
    return () => observer.current?.disconnect();
  }, [comments, hasMore, isLoading]);

  const fetchMoreComments = async () => {
    if (!token || !epigramId || !cursor) return;

    setIsLoading(true);
    try {
      const res = await getEpigramComments(token, epigramId, 3, cursor);

      if (res.list.length > 0) {
        setComments((prev) => [...prev, ...res.list]);

        if (res.list.length < 3) {
          setHasMore(false); // 마지막 페이지 도달
        } else {
          const lastId = res.list[res.list.length - 1].id;
          setCursor(lastId); // 다음 커서 업데이트
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('추가 댓글 불러오기 실패', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (content: string, isPrivate: boolean) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await createComment(token, epigramId, content, isPrivate);

      setComments((prev) => [response, ...prev]); // 새 댓글 맨 위에 추가
      setTotalCount((prev) => prev + 1); // 댓글수 실시간 증가
    } catch (err) {
      console.error('댓글 작성 실패', err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (!session || !token) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="rounded-md bg-[#F5F7FA] px-4 py-6">
      <CommentCount count={totalCount} />

      <CommentInput userImage={userImage} onSubmit={handleCreate} />

      <EpigramCommentList
        epigramId={epigramId}
        comments={comments}
        setComments={setComments}
        setTotalCount={setTotalCount}
      />
      <div ref={observerRef} className="h-4" />
      {isLoading && <div className="text-center text-sm text-gray-500">댓글 불러오는 중...</div>}
    </div>
  );
}
