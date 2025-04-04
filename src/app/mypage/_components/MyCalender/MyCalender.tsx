'use client';

import { EmotionLog } from '@/types/Emotionlog';
import CustomCalender from './CustomCalender';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog';
import moment from 'moment';
import { useEmotionContext } from '../EmotionContext';

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

  if (!data) return;

  return <CustomCalender data={data} displayMonth={displayMonth} setDisplayMonth={setDisplayMonth} />;
}
