import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useTimeout } from '@/hooks/useTimeout';
import { isNumber } from '@/utils/utils';
import { QuizSelections } from '@/components/QuizSelections/QuizSelections';

function Quiz() {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const {
    currentQuiz, quizLength, data, isFetched,
  } = useGetQuiz({ index: Number(id) });

  useEffect(() => {
    if (!isNumber(Number(id))) {
      return navigate('/');
    }

    if (isFetched && !data) {
      navigate('/');
    }
  }, [isFetched, data, navigate, id]);

  useTimeout(() => {
    if (id && quizLength) {
      setIsSelected(false);
      const numbedId = Number(id);
      if (numbedId + 1 >= quizLength) {
        return navigate('/result');
      }

      navigate(`/quiz/${numbedId + 1}`);
    }
  }, isSelected ? 1000 : null);

  return (
    <div className="flex flex-col w-full h-full">
      <section className="flex items-end h-[30%]">
        <h1 className="text-center">{currentQuiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <QuizSelections
          quiz={currentQuiz}
          isSelected={isSelected}
          onClick={() => setIsSelected(true)}
        />
      </section>
    </div>
  );
}

export { Quiz };
