'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import SocialLogins from '../_component/SocialLogins';

const loginSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('유효한 이메일을 입력하세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { data: session, status } = useSession(); // 현재 로그인된 세션 정보 가져오기
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
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
    setError(''); // 기존 에러 초기화

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // 자동 리다이렉트 방지
    }); // 응답 로그 확인

    if (res?.error) {
      setError('이메일 또는 비밀번호가 다릅니다.'); // NextAuth에서 받은 에러 메시지를 그대로 사용
      return;
    }

    router.push('/');
  };

  useEffect(() => {
    if (status === 'loading') return; // 로딩 중이면 아무 작업 안 함
    if (session?.user) {
      router.push('/');
    }
  }, [session, status, router]);

  return (
    <>
      <div className="tablet:max-w-none mx-auto flex w-full max-w-[384px] flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[10px]">
          {/* 이메일 입력 */}
          <div className="flex flex-col items-start gap-[8px]">
            <input
              type="email"
              placeholder="이메일"
              {...register('email')}
              className={`font-pretendard h-[44px] w-full rounded-lg border border-none bg-[#ECEFF4] px-4 text-[16px] leading-[26px] font-normal text-[#050505] placeholder-[#ABB8CE] focus:outline-[#6A82A9] ${
                errors.email ? 'outline-2 outline-red-500' : ''
              }`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col items-start gap-[8px]">
            <div className="relative w-full">
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
                className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center"
              >
                <Image
                  src={showPassword ? '/assets/icons/visibility_on.svg' : '/assets/icons/visibility_off.svg'}
                  alt="비밀번호 보이기/숨기기"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className={`font-pretendard mt-[10px] h-[44px] w-full rounded-[12px] text-[16px] leading-[26px] font-semibold text-white transition ${
              isValid ? 'cursor-pointer bg-[#454545]' : 'bg-[#CBD3E1] opacity-50'
            }`}
            disabled={!isValid}
          >
            로그인
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
        <p className="pc:text-pre-xl! tablet:text-pre-lg tablet:mb-[60px] text-pre-md mt-[10px] mb-[50px] flex w-full justify-end gap-2 font-medium text-[#ABB8CE]">
          회원이 아니신가요?
          <a
            href="/auth/signup"
            className="pc:text-pre-xl! tablet:text-pre-lg text-pre-md font-medium text-[#454545] underline"
          >
            가입하기
          </a>
        </p>

        <SocialLogins authType="LOGIN" />
      </div>
    </>
  );
}
