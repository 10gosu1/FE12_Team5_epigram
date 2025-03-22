import { Epigram } from '@/types/Epigram';

// 에피그램 목록 조회
export async function getEpigramsList(
  limit: number = 6,
  cursor?: number,
  keyword?: string,
  writerId?: number,
): Promise<{ list: Epigram[]; totalCount: number }> {
  try {
    const query = new URLSearchParams({
      limit: String(limit),
      ...(cursor !== undefined && { cursor: String(cursor) }),
      ...(keyword && { keyword }),
      ...(writerId !== undefined && { writerId: String(writerId) }),
    });

    // TODO: auth 완료된 후 getSession으로 변경
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ5NiwidGVhbUlkIjoiMTItNSIsInNjb3BlIjoicmVmcmVzaCIsImlhdCI6MTc0MjQ1NjMwOCwiZXhwIjoxNzQzMDYxMTA4LCJpc3MiOiJzcC1lcGlncmFtIn0.56c6Vm2_Jf2e318qOsQAwK3hmb6jY9wNRHcS_tkCdkY';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok || response === null) {
      throw new Error('데이터를 불러오는 중 문제가 발생했습니다.');
    }

    const data = await response.json();
    return {
      list: data.list || [],
      totalCount: data.totalCount || 0
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`에피그램 목록을 불러오는 중 오류 발생: ${error.message}`);
    } else {
      console.error('에피그램 목록을 불러오는 데 실패했습니다.');
    }
    return {
      list: [],
      totalCount: 0
    };
  }
}

export async function GetTodayEpigram() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/today`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다.');
    }
    const data = response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    } else {
      console.error('감정을 등록하는데 실패했습니다.');
    }
  }
}
