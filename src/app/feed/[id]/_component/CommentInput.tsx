'use client';

import { useState } from 'react';
import { Avatar } from '@/components/Comment/Avatar';
import ClientButton from '@/components/Button/ClientButton';

interface Props {
  onSubmit: (content: string, isPrivate: boolean) => void;
  userImage: string | null;
}

export default function CommentInput({ onSubmit, userImage }: Props) {
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async () => {
    if (content.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      // 댓글 작성 API 호출
      onSubmit(content, isPrivate);
      setContent('');
      setIsPrivate(false);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="tablet:mb-8 pc:mb-10 bg-bg-100 tablet:px-0 pc:px-0 mb-3 flex items-start gap-4 rounded-md px-6 py-4">
      <Avatar src={userImage ?? ''} alt="프로필 이미지" className="h-12 w-12" />

      <div className="flex-1">
        <textarea
          placeholder="100자 이내로 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={100}
          className="custom-scrollbar border-line-200 text-pre-lg leading-text-pre-lg font-regular text-black-700 pc:text-pre-xl pc:leading-text-pre-xl w-full resize-none rounded-md border px-3 py-2 placeholder-blue-400 outline-none focus:border-blue-600"
        />

        <div className="flex items-center justify-between">
          {/* 공개/비공개 토글 */}
          <div className="flex items-center gap-2">
            <span className="text-pre-xs tablet:text-pre-md pc:text-pre-lg w-12 text-center text-gray-400">
              {isPrivate ? '비공개' : '공개'}
            </span>
            <button
              onClick={() => setIsPrivate((prev) => !prev)}
              className={`h-5 w-10 rounded-full transition-colors duration-200 ${
                isPrivate ? 'bg-gray-400' : 'bg-black-600'
              }`}
            >
              <div
                className={`h-4 w-4 transform rounded-full bg-blue-100 shadow transition-transform duration-200 ${
                  isPrivate ? 'translate-x-1' : 'translate-x-5'
                }`}
              />
            </button>
          </div>

          <ClientButton
            isValid={content.trim().length > 0}
            onClick={handleSubmit}
            className="text-pre-xs tablet:text-pre-md pc:text-pre-lg tablet:h-[32px] pc:h-[44px] tablet:w-[53px] pc:w-[60px] flex h-[32px] w-[53px] items-center justify-center font-semibold whitespace-nowrap"
          >
            저장
          </ClientButton>
        </div>
      </div>
    </div>
  );
}
