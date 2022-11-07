import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

import { Link } from '@/components/Link';
import { QuizSelections } from '@/components/QuizSelections/QuizSelections';
import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useGlobalContext } from '@/store/GlobalContext';
import type { QuizModel } from '@/models/QuizModel';

function getCounts(callback: (el: QuizModel) => boolean, quizs?: QuizModel[]) {
  if (!quizs) { return 0; }

  const count = quizs.reduce((prev, curr) => {
    if (callback(curr)) {
      return prev + 1;
    }

    return prev;
  }, 0);

  return count;
}

function getCountLabel(label: string, count: number) {
  return `${label} : ${count} 개`;
}

function Result() {
  const navigate = useNavigate();
  const { getSpentTime, setStartTime } = useGlobalContext();

  const {
    data: quizs, isError, isFetching,
  } = useGetQuiz({ isFinished: true });

  useEffect(() => {
    if (isError || (!isFetching && !quizs)) {
      navigate('/');
    }
  }, [navigate, isError, isFetching, quizs]);

  const correctCount = getCounts((el) => el.isCorrect(), quizs?.results);
  const inCorrectCount = getCounts((el) => !el.isCorrect(), quizs?.results);

  const CorrectCount = getCountLabel('정답 갯수', correctCount);
  const InCorrectCount = getCountLabel('오답 갯수', inCorrectCount);

  const SpentTime = format(getSpentTime(), '소요시간 : m분 s초');

  return (
    <div className="w-full py-[100px]">
      <section className="flex flex-col justify-around items-center h-[200px] mb-[50px]">
        <h1 className="mb-[10px]">결과</h1>
        <h3>
          {CorrectCount}
        </h3>
        <h3>
          {InCorrectCount}
        </h3>
        <h3>
          {SpentTime}
        </h3>
      </section>
      <section className="flex flex-col gap-[50px]">
        {
          quizs
            ? quizs.results.map((quiz) => (
              <div className="w-full h-[400px] mb-[50px]">
                <QuizSelections hold isSelected quiz={quiz} />
              </div>
            ))
            : <div>loading</div>
        }
      </section>
      <footer className="flex flex-col justify-center items-center w-full h-[200px] child/Wo.last:mb-[30px]">
        <Link
          href="/quiz/0"
          className="flex justify-center items-center px-[20px] py-[10px] font-bold text-[30px] rounded-2xl bg-lime-500"
          onClick={() => {
            quizs?.results.forEach((quiz) => quiz.initQuiz());
            setStartTime();
          }}
        >
          다시 도전하기!
        </Link>
        <Link href="/" className="flex justify-center items-center px-[20px] py-[10px] font-bold text-[30px] rounded-2xl bg-slate-400">홈으로!</Link>
      </footer>
    </div>
  );
}

export { Result };
