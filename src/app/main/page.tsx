import MainHeader from '@/components/header/MainHeader';
import TodayEmotion from '@/components/TodayEmotion';
import TodayEpirams from './_conponents/todayEpigrams';

export default function Page() {
  return (
    <>
      <MainHeader />
      <div className="gird justify-items-center">
        <div className="pc:w-[640px] tablet:w-[384px] w-[312px]">
          <div className="pc:mb-[140px] mb-[56px]">
            <TodayEpirams />
          </div>
          <div className="text-pre-lg pc:text-iro-2xl">
            <p>오늘의 감정은 어떤가요?</p>
          </div>
          <div>
            <TodayEmotion emotionType="main" />
          </div>
        </div>
      </div>
    </>
  );
}
