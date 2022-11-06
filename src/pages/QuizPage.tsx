import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useTimeout } from '@/hooks/useTimeout';
import { isNumber } from '@/utils/utils';
import { QuizSelections } from '@/components/QuizSelections/QuizSelections';

function QuizPage() {
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
    <div className="w-full h-full">
      <QuizSelections
        quiz={currentQuiz}
        isSelected={isSelected}
        onClick={() => {
          setIsSelected(true);
        }}
      />
    </div>
  );
}

export { QuizPage };
