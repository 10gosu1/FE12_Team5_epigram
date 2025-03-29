'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef } from 'react';

export default function MainHeader() {
  const { data: session } = useSession();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); //사이드바 & 드롭다운 감지

  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        //사이드바 & 드롭다운 바깥 클릭 감지 후 닫기)
        if (containerRef.current?.contains(e.target as Node)) return;
        setIsDropdown(false);
        setIsSidebar(false);
      }}
    >
      <header className="tablet:px-18 tablet:py-[17px] pc:px-[120px] pc:py-[22px] border-b border-[var(--color-line-100)] bg-[var(--color-blue-100)] px-6 py-[13px]">
        <div className="flex w-full items-center justify-between">
          {/* 왼쪽: 로고 + Epigram 텍스트 + 네비게이션 메뉴 */}
          <div className="flex items-center gap-[12px]">
            {/* 모바일에서만 보이는 메뉴 아이콘 */}
            <div
              className="mobile:flex mobile:items-center tablet:hidden h-8 w-auto"
              onClick={(e) => {
                //사이드바 열기
                e.stopPropagation();
                setIsSidebar(true);
              }}
            >
              <Image src="/assets/icons/gnb-menu.svg" alt="Menu Icon" width={24} height={24} className="object-cover" />
            </div>
            {/* 로고 + Epigram 텍스트 */}
            <div className="flex items-center gap-[4px]">
              <div className="h-8 w-8">
                <Image
                  src="/assets/images/logo.png"
                  alt="Epigram Logo"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>
              <span
                className="tablet:text-[var(--text-mon-xxs)] tablet:leading-[var(--text-mon-lg--line-height)] pc:text-[var(--text-mon-sm)] pc:leading-[var(--text-mon-lg--line-height)] leading-[var(--text-mon-lg--line-height)] font-black tracking-normal text-[var(--text-mon-xxs)]"
                style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--color-black-900)', fontWeight: '900' }}
              >
                Epigram
              </span>
            </div>
            {/* 네비게이션 메뉴 (피드, 검색) */}
            <nav
              className="mobile:hidden tablet:flex pc:flex pc:ml-[36px] pc:text-[var(--text-pre-lg)] pc:leading-[26px] gap-4 text-center leading-[24px] font-semibold tracking-normal text-[var(--text-pre-md)]"
              style={{ color: 'var(--color-black-600)' }}
            >
              <Link href="/feed" className="hover:text-[var(--color-black-900)]">
                피드
              </Link>
              <Link href="/search" className="hover:text-[var(--color-black-900)]">
                검색
              </Link>
            </nav>
          </div>
          {/* 유저 프로필 */}
          <div className="relative">
            <div
              className="flex items-center gap-2"
              onClick={(e) => {
                // 드롭다운버튼 열기
                e.stopPropagation();
                setIsDropdown(!isDropdown);
              }}
            >
              <Image
                src="/assets/icons/user.svg"
                width={16}
                height={16}
                alt="User Icon"
                className="h-6 w-6 text-[var(--color-black-600)]"
              />
              <span className="text-pre-md tablet:inline text-[var(--color-black-500)]">{session?.user.nickname}</span>
            </div>
            {isDropdown && ( //드롭다운
              <div className="absolute right-0 w-[90px] rounded-md border border-gray-100 bg-white text-center shadow-lg">
                <div className="text-pre-md font-weight-regular cursor-pointer border-b border-gray-100 p-2 hover:bg-gray-200">
                  <Link href="/mypage" onClick={() => setIsDropdown(false)}>
                    마이 프로필
                  </Link>
                </div>
                <div
                  className="text-pre-md font-weight-regular cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => signOut()} //로그아웃
                >
                  로그아웃
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {isSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute top-4 left-0 h-full" onClick={() => setIsSidebar(false)}>
            <aside className="relative z-50 flex h-full w-[220px] flex-col bg-white p-4 shadow-lg">
              <div className="h-[20px] border-b p-[15px]">
                <button className="absolute top-2 right-4" onClick={() => setIsSidebar(false)}>
                  <Image src="/assets/icons/x.svg" alt="엑스버튼" width={24} height={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-[24px] py-[30px] text-lg">
                <Link href="/feed" className="hover:text-black" onClick={() => setIsSidebar(false)}>
                  피드
                </Link>
                <Link href="/search" className="hover: text-black" onClick={() => setIsSidebar(false)}>
                  검색
                </Link>
              </nav>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
