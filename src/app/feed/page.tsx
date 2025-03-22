// /app/page.tsx
'use client';

import FeedCard from '@/components/FeedCard';
import Image from 'next/image';
import { useState } from 'react';
import EmptyState from '@/components/EmptyState';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';
import { useItems } from '@/hooks/useItems';
import { getEpigramsList } from '@/lib/Epigram';
import { Epigram } from '@/types/Epigram';

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);

  const { loadingState, loadMore } = useItems<Epigram>(6, getEpigramsList);
  const { isLoading, items: epigrams, totalCount } = loadingState;

  const gridStyle = isGridView ? 'grid grid-cols-2' : 'grid grid-cols-1';

  return (
    <>
      <main className="bg-bg-100">
        <div className="pc:pt-[120px] tablet:pb-[114px] m-auto max-w-[1240px] px-[24px] pt-[32px] pb-[56px]">
          <div className="pc:mb-[40px] mb-[24px] flex content-center justify-between">
            <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">피드</h1>
            <div>
              <button onClick={() => setIsGridView((prev) => !prev)} className="tablet:hidden cursor-pointer">
                <Image
                  src={isGridView ? '/assets/icons/list.svg' : '/assets/icons/feed.svg'}
                  width={24}
                  height={24}
                  alt={isGridView ? '리스트 아이콘' : '피드 아이콘'}
                />
              </button>
            </div>
          </div>
          {isLoading && epigrams.length === 0 ? (
            <div
              className={`${gridStyle} pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2`}
            >
              <SkeletonFeedCard count={6} />
            </div>
          ) : totalCount === 0 ? (
            <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 작성하고 감정을 공유해보세요.`} />
          ) : (
            <div
              className={`${gridStyle} pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2`}
            >
              {epigrams.map((item) => (
                <FeedCard key={item.id} data={item} />
              ))}
            </div>
          )}
          {epigrams.length < totalCount && (
            <button onClick={loadMore} className="mt-4 rounded bg-blue-500 p-2 text-white">
              더보기
            </button>
          )}
        </div>
      </main>
    </>
  );
}
