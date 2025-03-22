'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ScrollInMotion = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 1.5 },
};

const DampingMotion = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export default function Home() {
  return (
    <div className="flex flex-col bg-blue-200">
      <section>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
          <div className="tablet:gap-[32px] pc:gap-[48px] flex flex-col items-center justify-center gap-[24px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <div className="tablet:gap-[24px] pc:gap-[40px] flex flex-col gap-[6px]">
                <h1 className="font-iropke text-iro-2xl text-black-500 tablet:text-iro-3xl pc:text-iro-4xl pc:leading-[64px] flex justify-center text-center font-normal">
                  나만 갖고 있기엔
                  <br /> 아까운 글이 있지 않나요?
                </h1>
                <p className="text-black-300 font-iropke text-iro-md tablet:text-iro-xl text-center font-normal">
                  다른 사람들과 감정을 공유해 보세요.
                </p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <motion.div {...DampingMotion}>
                <Link
                  href={'/epigrams'}
                  className="bg-black-500 text-pre-lg pc:text-pre-xl pc:px-[108px] pc:py-[16px] rounded-[12px] px-[28px] py-[11px] font-semibold text-blue-100"
                >
                  시작하기
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-[20px] flex flex-col items-center justify-center gap-[4px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <p className="text-pre-xs tablet:text-pre-lg font-semibold text-blue-400">더 알아보기</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <Image src="/assets/icons/chevron.svg" alt="화살표" width={24} height={24} />
            </motion.div>
          </div>
        </div>
        <div className="h-[15px] w-full bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
      </section>

      <section className="bg-bg-100">
        <div className="tablet:gap-[380px] tablet:mt-[254px] mx-auto mt-[131px] mb-[210px] flex min-h-screen w-full max-w-[1316px] flex-col items-center justify-center px-[24px] pt-[124px]">
          <div className="tablet:flex-row tablet:gap-[80px] m-[24px] ml-[68px] flex h-auto max-w-[1400px] min-w-[312px] flex-col items-center justify-center">
            <img
              src="/assets/images/rending/img_Desktop_landing01.png"
              alt="명언, 글귀 등 공유글 예시 이미지"
              className="tablet:min-w-[480px] tablet:mt-[50px] h-auto w-full object-contain"
            />
            <div className="tablet:w-1/2 font-pretendard text-black-950 mt-auto flex w-full min-w-[429px] flex-col justify-center gap-[24px] text-left font-bold">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                명언이나 글귀,
                <br />
                토막 상식들을 공유해 보세요.
              </h5>
              <p className="text-[clamp(12px,1.2vw,24px)] font-medium text-blue-600">
                나만 알던 소중한 글들을
                <br />
                다른 사람들에게 전파하세요.
              </p>
            </div>
          </div>

          <div className="tablet:flex-row-reverse tablet:gap-[80px] m-[24px] flex h-auto max-w-[1400px] min-w-[312px] flex-col items-center justify-center">
            <img
              src="/assets/images/rending/img_Desktop_landing02.png"
              alt="감정 상태 선택 예시 이미지"
              className="tablet:min-w-[480px] tablet:mt-[50px] h-auto w-full max-w-full overflow-hidden object-contain"
            />
            <div className="tablet:w-1/2 font-pretendard text-black-950 mt-auto flex w-full min-w-[438px] flex-col justify-center gap-[24px] text-right font-bold">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                감정 상태에 따라,
                <br />
                알맞은 위로를 받을 수 있어요.
              </h5>
              <p className="text-[clamp(12px,1.2vw,24px)] font-medium text-blue-600">
                태그를 통해 글을 모아 볼 수 있어요.
              </p>
            </div>
          </div>

          <div className="tablet:flex-row tablet:gap-[80px] m-[24px] ml-[68px] flex h-auto max-w-[1400px] min-w-[312px] flex-col items-center justify-center">
            <img
              src="/assets/images/rending/img_Desktop_landing03.png"
              alt="감정 상태 통계 예시 이미지"
              className="tablet:min-w-[480px] tablet:mt-[50px] h-auto w-full max-w-full overflow-hidden object-contain"
            />
            <div className="font-pretendard text-black-950 mt-auto flex w-full min-w-[429px] flex-col justify-center gap-[24px] text-left font-bold">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                내가 요즘 어떤 감정 상태인지
                <br />
                통계로 한눈에 볼 수 있어요.
              </h5>
              <p className="text-[clamp(12px,1.2vw,24px)] font-medium text-blue-600">
                감정 달력으로
                <br />내 마음에 담긴 감정을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 세번째 세션 */}
      <section className="bg-bg-100 flex">
        <div className="relative flex w-full flex-col items-center justify-end">
          <div className="pc:w-[640px] tablet:w-[384px] pc:mt-[270px] pc:h-[1056px] mx-[24px] mt-[80px] flex h-[680px] w-[full] flex-col items-center justify-center gap-[40px] text-center">
            <h1 className="text-black-950 text-pre-2xl font-bold">
              사용자들이 직접
              <br />
              인용한 에피그램들
            </h1>
            <div className="pc:gap-[60px] tablet:gap-[20px] flex h-[full] w-[full] flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <div className="pc:h-[148px] h-[120px] rounded-[16px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
                  <div>
                    <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                      <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                        오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
                      </h2>
                      <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                        -앙드레 말로-
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                  <h3>#나아가야할때</h3>
                  <h3>#꿈을이루고싶을때</h3>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="pc:h-[228px] h-[166px] rounded-[16px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
                  <div>
                    <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                      <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                        이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는거야.
                        무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.
                      </h2>
                      <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                        -파울로 코엘료-
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                  <h3 className="">#나아가야할때</h3>
                  <h3>#꿈을이루고싶을때</h3>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="pc:h-[148px] h-[120px] rounded-[16px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
                  <div>
                    <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                      <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                        오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
                      </h2>
                      <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                        -앙드레 말로-
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                  <h3>#나아가야할때</h3>
                  <h3>#꿈을이루고싶을때</h3>
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/assets/icons/kebab.svg" alt="케밥 아이콘" width={24} height={24} />
              </div>
            </div>
          </div>
          <div className="mt-[24px] h-[15px] w-full rotate-180 bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
        </div>
      </section>

      {/*네번째 파트*/}
      <section>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
          <div className="pc:gap-[48px] flex flex-col items-center justify-center gap-[32px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <Image
                className="pc:w-[182px] pc:h-[104px]"
                src="/assets/images/slogan-text.svg"
                width={122}
                height={70}
                alt="날마다 에피그램"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <motion.div {...DampingMotion}>
                <Link
                  href={'/epigrams'}
                  className="pc:text-pre-xl pc:px-[108px] pc:py-[16px] bg-black-500 text-pre-lg rounded-[12px] px-[28px] py-[11px] font-semibold text-blue-100"
                >
                  시작하기
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
