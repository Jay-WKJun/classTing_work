import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetQuiz } from '@/hooks/useGetQuiz';
import { isNumber } from '@/utils/utils';
import { QuizSelections } from '@/components/QuizSelections/QuizSelections';

function QuizPage() {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const numberedId = Number(id);

  const {
    currentQuiz, quizLength, data, isFetched,
  } = useGetQuiz({ index: numberedId });

  useEffect(() => {
    if (!isNumber(numberedId)) {
      return navigate('/');
    }

    if (isFetched && !data) {
      navigate('/');
    }
  }, [isFetched, data, navigate, numberedId]);

  const ToTheNextButton = useMemo(() => {
    if (!isNumber(numberedId) || !quizLength) {
      return null;
    }

    const isLast = numberedId + 1 >= quizLength;

    const [callback, content] = isLast
      ? [() => navigate('/result'), '결과 보기']
      : [() => navigate(`/quiz/${numberedId + 1}`), '다음 문항'];

    return (
      <button
        type="button"
        className="text-[24px] rounded-2xl bg-red-400 px-[20px] py-[10px]"
        onClick={() => {
          setIsSelected(false);
          callback();
        }}
      >
        {content}
      </button>
    );
  }, [navigate, numberedId, quizLength]);

  return (
    <div className="w-full min-h-full py-[50px]">
      <QuizSelections
        quiz={currentQuiz}
        isSelected={isSelected}
        onClick={!isSelected
          ? () => {
            setIsSelected(true);
          }
          : undefined}
      />
      <footer className="w-full flex justify-center items-center mt-[50px]">
        {isSelected && ToTheNextButton}
      </footer>
    </div>
  );
}

export { QuizPage };
