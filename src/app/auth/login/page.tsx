'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react'; // 이거가 next-auth방식이라고는함..
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PostSignIn } from '@/lib/auth';
import SocialLogins from '../_component/SocialLogins';

const loginSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('유효한 이메일을 입력하세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface User {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}

interface PostSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response: PostSignInResponse = await PostSignIn(formData);

      if (response?.accessToken) {
        router.push('/');
      } else {
        setError('이메일 혹은 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      setError('로그인에 실패하였습니다.');
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/api/auth/session');
      const session = await res.json();
      if (session?.user) {
        router.push('/');
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="mx-auto flex w-full max-w-[312px] flex-col items-center justify-center md:max-w-[384px] lg:max-w-[640px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <input
            type="email"
            placeholder="이메일"
            {...register('email')}
            className={`font-pretendard h-[44px] w-full rounded-lg border border-none bg-[#ECEFF4] p-3 text-[16px] leading-[26px] font-normal text-[#050505] placeholder-[#ABB8CE] focus:outline-[#6A82A9] ${
              errors.email ? 'outline-2 outline-red-500' : ''
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col">
          <div className="relative">
            {' '}
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              {...register('password')}
              className={`font-pretendard h-[44px] w-full rounded-lg border border-none bg-[#ECEFF4] px-4 pr-12 text-[16px] leading-[26px] font-normal text-[#050505] placeholder-[#ABB8CE] focus:outline-[#6A82A9] ${
                errors.password ? 'outline-2 outline-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center justify-center"
            >
              <Image
                src={showPassword ? '/assets/icons/visibility_on.svg' : '/assets/icons/visibility_off.svg'}
                alt="비밀번호 보이기/숨기기"
                width={24}
                height={24}
              />
            </button>
          </div>

          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className={`font-pretendard h-[44px] w-full rounded-[12px] text-[16px] leading-[26px] font-semibold text-white transition ${
            isValid ? 'cursor-pointer bg-[#454545]' : 'bg-[#CBD3E1] opacity-50'
          }`}
          disabled={!isValid}
        >
          로그인
        </button>
      </form>

      <p className="font-pretendard mt-[10px] mb-[50px] flex w-full justify-end gap-2 text-[14px] leading-[24px] font-medium text-[#ABB8CE]">
        회원이 아니신가요?
        <a href="/signup" className="text-[14px] leading-[26px] font-medium text-[#454545] underline">
          가입하기
        </a>
      </p>
      <SocialLogins authType="LOGIN" />
    </div>
  );
}
