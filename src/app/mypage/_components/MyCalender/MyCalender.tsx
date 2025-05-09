'use client';

import { EmotionLog } from '@/types/Emotionlog';
import CustomCalender from './CustomCalender';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog';
import moment from 'moment';
import { useEmotionContext } from '../EmotionContext';
import SkeletonMyCalender from '@/components/skeletons/SkeletonMyCalender';

export default function MyCalender({ writerId }: { writerId: string }) {
  const [data, setData] = useState<EmotionLog[]>();
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const { todayEmotion } = useEmotionContext();

  const getData = async () => {
    const response = await GetMonthEmotion(
      Number(writerId),
      moment(displayMonth).year(),
      moment(displayMonth).month() + 1,
    );
    if (!response) return;

    setData(response);
  };

  useEffect(() => {
    getData();
  }, [displayMonth, todayEmotion]);

  if (!data)
    return (
      <div className="flex flex-col">
        <span className="text-pre-lg text-black-600 pc:text-pre-2xl font-semibold">
          {moment(displayMonth).format('YYYY년 M월')}
        </span>
        <div className="pc:h-[548px] tablet:h-[326px] flex h-[264px] items-center justify-center">
          <SkeletonMyCalender />
        </div>
      </div>
    );

  return <CustomCalender data={data} displayMonth={displayMonth} setDisplayMonth={setDisplayMonth} />;
}
