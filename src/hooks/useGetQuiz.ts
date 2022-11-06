import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getQuiz } from '@/api/quizApi';
import { quizKeys } from '@/constants/queryKeys';
import { QuizModel } from '@/models/QuizModel';
import { isNumber } from '@/utils/utils';

interface UseGetQuizProps {
  index?: number;
  isFinished?: boolean;
  onSuccess?: () => void;
}

function useGetQuiz({
  index,
  isFinished,
  onSuccess,
}: UseGetQuizProps) {
  const res = useQuery(
    quizKeys.default,
    () => getQuiz({}).then((res) => ({
      ...res,
      results: res.results.map((el) => new QuizModel(el)),
    })),
    {
      onSuccess,
      enabled: !isNumber(index) && !isFinished,
    },
  );

  return useMemo(() => ({
    ...res,
    currentQuiz: (isNumber(index) && res.data) ? res.data.results[index] : null,
    quizLength: res.data?.results.length,
  }), [res, index]);
}

export { useGetQuiz };
