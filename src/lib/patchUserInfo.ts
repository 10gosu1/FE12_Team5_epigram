import { notify } from '@/util/toast';

interface PatchUserInfoArgs {
  nickname?: string;
  image?: string;
  token: string | undefined;
}

export async function patchUserInfo({ nickname, image, token }: PatchUserInfoArgs): Promise<void> {
  if (!token) throw new Error('Access token이 없습니다.');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      image,
      nickname,
    }),
  });

  const resText = await response.text();
  console.log('서버 응답:', resText);

  if (response.ok) {
    notify({ type: 'success', message: '프로필 변경에 성공하였습니다!' });
  }

  if (!response.ok) {
    if (response.status === 400) {
      notify({ type: 'error', message: '중복된 닉네임 입니다!' });
    }

    throw new Error('유저 정보 수정 실패');
  }
}
