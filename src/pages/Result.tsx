import { QuizSelections } from '@/components/QuizSelections/QuizSelections';
import { useGetQuiz } from '@/hooks/useGetQuiz';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

function Result() {
  const navigate = useNavigate();
  const {
    data: quizs, isError, isFetching,
  } = useGetQuiz({ isFinished: true });

  useEffect(() => {
    if (isError || (!isFetching && !quizs)) {
      navigate('/');
    }
  }, [navigate, isError, isFetching, quizs]);

  const CorrectRatio = useMemo(() => {
    const correctQuizCount = quizs?.results.reduce((prev, curr) => {
      if (curr.isCorrect()) {
        return prev + 1;
      }

      return prev;
    }, 0);

    const totalQuizCount = quizs?.results.length;

    return `${correctQuizCount} / ${totalQuizCount}`;
  }, [quizs]);

  return (
    <div className="w-full py-[100px]">
      <section className="flex flex-col justify-around items-center h-[150px] mb-[100px]">
        <h1>정답률</h1>
        <h1>
          {CorrectRatio}
        </h1>
      </section>
      {
        quizs
          ? quizs.results.map((quiz) => (
            <div className="w-full h-[400px] mb-[50px]">
              <QuizSelections isSelected quiz={quiz} />
            </div>
          ))
          : <div>loading</div>
      }
    </div>
  );
}

export { Result };
