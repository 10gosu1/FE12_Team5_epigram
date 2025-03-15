'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('로그인 데이터:', data);
    // 로그인 요청 로직 추가 예정
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-center justify-center">
      {/* Epigram 로고 추가 */}
      <div className="mb-6 flex flex-col items-center">
        <Image src="/assets/images/logo.png" alt="Epigram Logo" width={80} height={80} />
        <h1 className="mt-2 text-2xl font-bold">Epigram</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* 이메일 입력 필드 */}
        <div>
          <input
            type="email"
            placeholder="이메일"
            {...register('email')}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            {...register('password')}
            className="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <Image
              src={showPassword ? '/assets/icons/visibility_on.svg' : '/assets/icons/visibility_off.svg'}
              alt="비밀번호 보이기/숨기기"
              width={24}
              height={24}
            />
          </button>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="w-full rounded-lg bg-gray-500 py-3 text-white transition hover:bg-gray-600">
          로그인
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        회원이 아니신가요?{' '}
        <a href="/signup" className="font-semibold text-blue-500">
          가입하기
        </a>
      </p>
    </div>
  );
}
