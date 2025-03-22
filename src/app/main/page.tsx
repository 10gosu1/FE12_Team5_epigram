import MainHeader from '@/components/header/MainHeader';
import TodayEmotion from '@/components/TodayEmotion';
import TodayEpirams from './_conponents/todayEpigrams';
import LatestEpigrams from './_conponents/LatestEpigrams';

export default function Page() {
  return (
    <>
      <MainHeader />
      <div className="gird justify-items-center">
        <div className="pc:w-[640px] tablet:w-[384px] w-[312px]">
          <div className="pc:mb-[140px] mb-[56px]">
            <TodayEpirams />
          </div>
          <div className="pc:mb-[140px] text-pre-lg pc:text-iro-2xl mb-[56px]">
            <p>오늘의 감정은 어떤가요?</p>
          </div>
          <div className="pc:mb-[140px] mb-[56px]">
            <TodayEmotion emotionType="main" />
          </div>
          <div className="pc:mb-[140px] mb-[56px]">
            <LatestEpigrams />
          </div>
        </div>
      </div>
    </>
  );
}
