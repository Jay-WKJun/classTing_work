import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getQuiz } from '@/api/quizApi';
import { quizKeys } from '@/constants/queryKeys';
import { QuizModel } from '@/models/QuizModel';

interface UseGetQuizProps {
  index?: number;
  isFinished?: boolean;
}

function useGetQuiz({
  index,
  isFinished,
}: UseGetQuizProps) {
  const res = useQuery(
    quizKeys.default,
    () => getQuiz({}).then((res) => ({
      ...res,
      results: res.results.map((el) => new QuizModel(el)),
    })),
    {
      enabled: !index && !isFinished,
    },
  );

  return useMemo(() => ({
    ...res,
    currentQuiz: (index && res.data) ? res.data.results[index] : null,
  }), [res, index]);
}

export { useGetQuiz };
