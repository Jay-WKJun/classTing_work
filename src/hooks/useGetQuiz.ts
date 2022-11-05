import { useQuery } from '@tanstack/react-query';

import { getQuiz } from '@/api/quizApi';
import { quizKeys } from '@/constants/queryKeys';

function useGetQuiz(index?: number) {
  return useQuery(
    quizKeys.default,
    () => getQuiz({}),
    {
      enabled: !index,
    },
  );
}

export { useGetQuiz };
