"use client";

import React, { useEffect, useState, JSX } from "react";
import { Waypoint } from "react-waypoint";
import { usePathname } from "next/navigation";

// 데이터를 가져올 때 필요한 기본 형태
// 각자 페이지에서 자신의 데이터 타입을 정의할 때 사용해주세요.
/*
interface FetchResult<T> {
  list: T[]; // 데이터를 배열로 가져옴
  hasMore: boolean; // 다음 데이터가 더 있는지 여부
}
*/

// 데이터를 가져올 때 필요한 기본 형태
interface FetchResult<T> {
  list: T[];
  hasMore: boolean;
}

// 무한스크롤 리스트의 기본 타입
interface InfiniteListProps<T> {
  fetchItems: (page: number, limit: number) => Promise<FetchResult<T>>;
  renderItem: (item: T, index: number) => JSX.Element;
  limit?: number;
  buttonText?: string;
}

// 무한스크롤 공통 컴포넌트
export default function InfiniteList<T>({
  fetchItems,
  renderItem,
  limit = 5,
  buttonText = "+ 에피그램 더보기",
}: InfiniteListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // 데이터를 불러오는 함수
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await fetchItems(page, limit);
      
      // 새로운 데이터가 없는 경우
      if (!data.list || data.list.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      // 중복 데이터 체크 및 필터링
      const newItems = data.list.filter(newItem => 
        !items.some(existingItem => 
          (existingItem as { id: number }).id === (newItem as { id: number }).id
        )
      );

      // 새로운 데이터가 없는 경우
      if (newItems.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setItems(prev => [...prev, ...newItems]);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more items:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    if (typeof window !== 'undefined') {
      const scrollPosition = window.scrollY;
      window.history.replaceState(
        { scrollPosition },
        '',
        pathname
      );
    }
  };

  // 스크롤 위치 복원
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const state = window.history.state;
      if (state?.scrollPosition) {
        window.scrollTo(0, state.scrollPosition);
      }
    }
  }, [pathname]);

  // 초기 데이터 로드
  useEffect(() => {
    if (isInitialLoad && items.length === 0 && !loading) {
      loadMore();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // 페이지 이동 시 스크롤 위치 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return (
    <div>
      <div className="max-w-lg mx-auto p-4">
        {/* 데이터가 없고, 로딩 중이 아닐 때 "데이터가 없습니다" 메시지 표시 */}
        {items.length === 0 && !loading && <p className="text-center text-gray-500">데이터가 없습니다.</p>}

        <ul className="space-y-4">
          {items.map((item, index) => renderItem(item, index))}
        </ul>

        {/* Waypoint를 사용한 무한 스크롤 */}
        {hasMore && (
          <Waypoint
            onEnter={loadMore}
            bottomOffset="200px"
          >
            <div className="h-10 flex justify-center items-center">
              {loading && <span className="text-gray-500">Loading...</span>}
            </div>
          </Waypoint>
        )}
      </div>
      <div className="max-w-lg mx-auto p-[140px]">
        {/* 더보기 버튼 */}
        {!loading && hasMore && (
          <button
            onClick={loadMore}
            className="w-[238px] h-[56px] px-[40px] py-[12px] gap-[8px] bg-100 border border-line-200 rounded-full text-blue-500"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
