import { useGetQuiz } from '@/hooks/useGetQuiz';
import React from 'react';

function Result() {
  const { data: quizs } = useGetQuiz({ isFinished: true });

  console.log(quizs);

  return <div>result</div>;
}

export { Result };
