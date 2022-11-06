import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

import { Link } from '@/components/Link';
import { QuizSelections } from '@/components/QuizSelections/QuizSelections';
import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useGlobalContext } from '@/store/GlobalContext';
import type { QuizModel } from '@/models/QuizModel';

function getCounts(callback: (el: QuizModel) => boolean, label: string, quizs?: QuizModel[]) {
  if (!quizs) { return ''; }

  const count = quizs.reduce((prev, curr) => {
    if (callback(curr)) {
      return prev + 1;
    }

    return prev;
  }, 0);

  return `${label} : ${count} 개`;
}

function Result() {
  const navigate = useNavigate();
  const { getSpentTime } = useGlobalContext();

  const {
    data: quizs, isError, isFetching,
  } = useGetQuiz({ isFinished: true });

  useEffect(() => {
    if (isError || (!isFetching && !quizs)) {
      navigate('/');
    }
  }, [navigate, isError, isFetching, quizs]);

  const CorrectCount = useMemo(() => (
    getCounts((el) => el.isCorrect(), '정답 갯수', quizs?.results)
  ), [quizs]);

  const InCorrectCount = useMemo(() => (
    getCounts((el) => !el.isCorrect(), '오답 갯수', quizs?.results)
  ), [quizs]);

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
      {
        quizs
          ? quizs.results.map((quiz) => (
            <div className="w-full h-[400px] mb-[50px]">
              <QuizSelections hold isSelected quiz={quiz} />
            </div>
          ))
          : <div>loading</div>
      }
      <footer className="flex justify-center items-center w-full h-[100px]">
        <Link href="/" className="flex justify-center items-center px-[20px] py-[10px] font-bold text-[30px] rounded-2xl border-[2px] border-black bg-slate-400">다시 도전하기!</Link>
      </footer>
    </div>
  );
}

export { Result };
