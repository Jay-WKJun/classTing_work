import './Api';

import axios, { AxiosResponse } from 'axios';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GetQuizProps {
  amount?: number,
  difficulty?: Difficulty,
}

interface GetQuizResponse {
  responseCode: number;
  results: {
    category: string,
    type: boolean,
    difficulty: Difficulty,
    question: string;
    correctAnswer: string,
    incorrectAnswers: string[]
  }[]
}

export async function getQuiz({
  amount = 10,
  difficulty = 'easy',
}: GetQuizProps) {
  const params = {
    amount,
    difficulty,
    type: 'multiple',
  };

  return axios
    .get('https://opentdb.com/api.php', {
      params,
    })
    .then((res: AxiosResponse<GetQuizResponse>) => res.data);
}
