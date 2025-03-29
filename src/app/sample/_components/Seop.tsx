'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog'; // 경로 맞게 수정
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B'];

export default function EmotionPieChart() {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  //현재년도와 월 가져오기

  useEffect(() => {
    if (!session?.user) return;
    const fetchData = async () => {
      console.log('User ID:', session.user);
      const userId = Number(session.user.id);
      if (isNaN(userId)) {
        console.error('userId가 유효하지 않습니다.');
        return;
      }
      const response = await GetMonthEmotion(userId, currentYear, currentMonth);
      if (response.length > 0) {
        const emotionCount: Record<string, number> = {};
        //감정 데이터 개수 카운트
        response.forEach((log: { emotion: string }) => {
          emotionCount[log.emotion] = (emotionCount[log.emotion] || 0) + 1;
        });
        // 차트 데이터 변환
        const formattedData = Object.keys(emotionCount).map((emotion) => ({
          name: emotion,
          value: emotionCount[emotion],
        }));
        setChartData(formattedData);
      }
    };
    fetchData();
  }, [session]);

  return (
    <div className="flex h-[300px] w-full flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#88884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
