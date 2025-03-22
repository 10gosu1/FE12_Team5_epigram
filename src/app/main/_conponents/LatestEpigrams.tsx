'use client';
import FeedCard from '@/components/FeedCard';
import useFetchEpigrams from '@/hooks/useFetchEpigrams';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';

export default function LatestEpigrams() {
  const { isLoading, epigrams } = useFetchEpigrams(3);

  return (
    <>
      <h2 className="pc:mb-[40px] text-pre-lg font-weight-semibold txt-color-black-900 pc:text-iro-2xl mb-[24px]">
        최신 에피그램
      </h2>
      <div className="grid gap-[16px]">
        {isLoading ? <SkeletonFeedCard count={3} /> : epigrams.map((item) => <FeedCard key={item.id} data={item} />)}
      </div>
    </>
  );
}
