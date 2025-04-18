import TodayEmotion from '@/components/TodayEmotion';
import TodayEpirams from './_components/todayEpigrams';
import LatestEpigrams from './_components/LatestEpigrams';
import LatestCommentSection from './_components/LatestCommentSection';

export default function Page() {
  return (
    <>
      <div className="gird justify-items-center">
        <div className="pc:w-[640px] tablet:w-[384px] w-[312px]">
          <div className="pc:mb-[140px] mb-[56px]">
            <TodayEpirams />
          </div>
          <div className="pc:gap-[40px] pc:mb-[140px] mb-[56px] grid gap-[24px]">
            <div className="text-pre-lg pc:text-iro-2xl font-semibold">오늘의 감정은 어떤가요?</div>
            <TodayEmotion emotionType="main" />
          </div>
          <div className="pc:mb-[140px] mb-[56px]">
            <LatestEpigrams />
          </div>
          <div className="tablet:pb-[270px] pc:pb-[119px] pb-[114px]">
            <LatestCommentSection />
          </div>
        </div>
      </div>
    </>
  );
}
