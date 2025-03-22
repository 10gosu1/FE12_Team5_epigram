'use client';

import { useState, useEffect } from 'react';
import MainHeader from '@/components/header/MainHeader';

interface Tag {
  name: string;
  id: number;
}

interface Epigram {
  id: number;
  content: string;
  author: string;
  writerId: number;
  likeCount: number;
  tags: Tag[];
  referenceUrl?: string;
  referenceTitle?: string;
}

interface ApiResponse {
  list: Epigram[];
  nextCursor: number | null;
  totalCount: number;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // 검색어 저장 함수
  const saveSearchTerm = (term: string) => {
    if (term.trim() === '') return;
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 최근 검색어 모두 지우기
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // 개별 검색어 삭제 함수
  const deleteSearchTerm = (termToDelete: string) => {
    const updatedSearches = recentSearches.filter(term => term !== termToDelete);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 검색어로 에피그램 검색
  const handleSearch = async (term: string) => {
    if (term.trim() === '') return;
    setIsLoading(true);
    saveSearchTerm(term);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams?limit=20`);
      const data: ApiResponse = await response.json();
      
      // 검색어로 필터링
      const filteredEpigrams = data.list.filter(epigram => 
        epigram.content.toLowerCase().includes(term.toLowerCase()) ||
        epigram.author.toLowerCase().includes(term.toLowerCase())
      );
      
      setEpigrams(filteredEpigrams);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 하이라이트 처리
  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <span key={i} className="text-blue-500">{part}</span> : part
    );
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <MainHeader />
      <div className="container max-w-[630px] mx-auto pl-[26px] pr-[16px] py-[32px]">
        {/* 검색창 */}
        <div className="mb-[32px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
            placeholder="검색어를 입력하세요"
            className="w-full px-[16px] py-[12px] focus:outline-none focus:ring-2 focus:ring-blue bg-blue-100 text-pre-lg text-black-300 placeholder-gray-300 pr-[48px] border-b-[4px] border-blue-800"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 p-[8px] hover:bg-blue-200 rounded-full transition-colors duration-200"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-800"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 최근 검색어 */}
        {recentSearches.length > 0 && (
          <div className="mb-[32px]">
            <div className="flex justify-between items-center mb-[40px]">
              <h2 className="text-pre-2xl font-pretendard text-black-300">최근 검색어</h2>
              <button
                onClick={clearRecentSearches}
                className="text-state-error text-[16px] font-semibold hover:text-red"
              >
                모두 지우기
              </button>
            </div>
            <div className="flex flex-wrap gap-[8px]">
              {recentSearches.map((term, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-[8px] px-[14px] py-[12px] bg-bg-100 rounded-[22px] font-pretendard text-pre-2xl text-black-300 cursor-pointer hover:bg-blue-300 transition-colors duration-200"
                >
                  <div
                    onClick={() => {
                      setSearchTerm(term);
                      handleSearch(term);
                    }}
                    className="flex-1 [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    {term}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSearchTerm(term);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black-300 hover:text-black-600"
                    >
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        <div className="space-y-[16px]">
          {isLoading ? (
            <div className="text-center py-[16px] text-pre-lg text-black-300">검색 중...</div>
          ) : epigrams.length > 0 ? (
            epigrams.map((epigram) => (
              <div key={epigram.id} className="p-[24px] border border-line-100 rounded-[22px] bg-blue-100">
                <div className="mb-[12px]">
                  <span className="font-pretendard font-semibold text-pre-lg text-black-600">
                    {highlightSearchTerm(epigram.author)}
                  </span>
                  <span className="ml-[8px] text-pre-sm text-gray-400">
                    좋아요 {epigram.likeCount}
                  </span>
                </div>
                <div className="mb-[12px] text-pre-lg text-black-300">
                  {highlightSearchTerm(epigram.content)}
                </div>
                {epigram.tags.length > 0 && (
                  <div className="flex gap-[8px]">
                    {epigram.tags.map(tag => (
                      <span key={tag.id} className="text-pre-sm text-gray-400">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : searchTerm ? (
            <div className="text-center py-[16px] text-pre-lg text-black-300">
              검색 결과가 없습니다.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
