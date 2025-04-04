'use client';

import { useState } from 'react';
import { Avatar } from './Avatar';
import { CommentCard } from './CommentCard';
import { deleteComment, updateComment } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import ClientButton from '../Button/ClientButton';
import ModalLayout from '../Modal/ModalLayout';
import ModalUSerProfile from '../Modal/ModalUserProfile';

interface Props {
  comment: Comment;
  token?: string;
  writerId?: number;
  onDelete: (id: number) => void;
  onSave: (updated: Comment) => void;
}

export function CommentItem({ comment, token, writerId, onDelete, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPrivate, setIsPrivate] = useState(comment.isPrivate);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSave = async () => {
    if (!token) {
      console.error('토큰이 없습니다. 댓글 수정 요청이 중단됩니다');
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      console.log('저장 전송:', {
        content: editedContent,
        isPrivate,
      });

      await updateComment(token, comment.id, editedContent, isPrivate);
      onSave({ ...comment, content: editedContent, isPrivate });
      setIsEditing(false);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!token) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      await deleteComment(token, comment.id);
      onDelete(comment.id); // 삭제 후 부모에 알림
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  function formatTime(createdAt: string) {
    return formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
      locale: ko,
    }).replace(/^약 /, '');
  }

  const isMyComment = writerId === comment.writer.id;

  return (
    <>
      <CommentCard className="border-line-200 bg-bg-100 tablet:py-6 pc:py-[35px] flex items-start border-t px-6 py-4">
        <button onClick={() => setIsProfileOpen(true)}>
          <Avatar src={comment.writer.image} alt={comment.writer.nickname} className="mr-4 h-12 w-12 cursor-pointer" />
        </button>
        <div className="flex-1">
          <div className="tablet:mb-3 pc:mb-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-300 cursor-pointer"
              >
                {comment.writer.nickname}
              </button>
              <span className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-300">
                {formatTime(comment.createdAt)}
              </span>

              {comment.isPrivate && (
                <img
                  src="/assets/icons/lock.svg"
                  alt="비공개"
                  className="tablet:h-4 tablet:w-4 pc:h-5 pc:w-5 ml-1 h-3 w-3 opacity-60"
                  title="비공개 댓글"
                />
              )}
            </div>

            {isMyComment && !isEditing && (
              <div className="flex gap-4 text-xs">
                <span
                  className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-600 cursor-pointer hover:underline"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </span>
                <span
                  className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular cursor-pointer text-[color:var(--color-state-error)] hover:underline"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  삭제
                </span>
              </div>
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                className="custom-scrollbar border-line-200 text-pre-lg leading-text-pre-lg font-regular text-black-700 pc:text-pre-xl pc:leading-text-pre-xl focus:border-black-600 w-full resize-none rounded-md border px-3 py-2 outline-none"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />

              <div className="flex items-center justify-between">
                {/* 공개/비공개 토글 */}
                <div className="flex items-center gap-2">
                  <span className="text-pre-xs tablet:text-pre-md pc:text-pre-lg leading-text-iro-xs tablet:leading-text-iro-md pc:leading-text-iro-lg text-black-600 font-semibold">
                    공개
                  </span>
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`h-5 w-10 rounded-full transition-colors duration-200 ${
                      isPrivate ? 'bg-gray-400' : 'bg-black-600'
                    }`}
                  >
                    <div
                      className={`h-4 w-4 transform rounded-full bg-blue-100 shadow transition-transform duration-200 ${
                        isPrivate ? 'translate-x-0' : 'translate-x-5'
                      }`}
                    />
                  </button>
                </div>

                {/* 저장/취소 버튼 */}
                <div className="flex gap-2">
                  <ClientButton
                    isValid={true}
                    className="text-pre-xs tablet:text-pre-md pc:text-pre-lg tablet:h-[32px] pc:h-[44px] tablet:w-[53px] pc:w-[60px] flex h-[32px] w-[53px] items-center justify-center font-semibold whitespace-nowrap"
                    onClick={handleSave}
                  >
                    저장
                  </ClientButton>
                  <ClientButton
                    isValid={true}
                    className="text-pre-xs tablet:text-pre-md pc:text-pre-lg tablet:h-[32px] pc:h-[44px] tablet:w-[53px] pc:w-[60px] flex h-[32px] w-[53px] items-center justify-center font-semibold whitespace-nowrap"
                    onClick={() => {
                      setEditedContent(comment.content);
                      setIsPrivate(comment.isPrivate);
                      setIsEditing(false);
                    }}
                  >
                    취소
                  </ClientButton>
                </div>
              </div>
            </>
          ) : (
            <p className="text-pre-md tablet:text-pre-lg pc:text-pre-xl font-regular leading-text-pre-md tablet:leading-text-pre-lg pc:leading-text-pre-xl text-black-700">
              {comment.content}
            </p>
          )}
        </div>
      </CommentCard>
      {isProfileOpen && (
        <ModalLayout type="content" onClose={() => setIsProfileOpen(false)}>
          <ModalUSerProfile nickname={comment.writer.nickname} />
        </ModalLayout>
      )}

      {isDeleteModalOpen && (
        <ModalLayout
          type="confirm"
          title="댓글을 삭제하시겠어요?."
          description="댓글은 삭제 후 복구할 수 없어요."
          actionLabel="삭제하기"
          onClose={() => setIsDeleteModalOpen(false)}
          onAction={handleDeleteConfirm}
        />
      )}
    </>
  );
}
