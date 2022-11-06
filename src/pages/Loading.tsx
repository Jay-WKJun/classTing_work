import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useInterval } from '@/hooks/useInterval';
import { useGlobalContext } from '@/store/GlobalContext';

function Loading() {
  const [dots, setDots] = useState('.');
  const navigate = useNavigate();
  const { setStartTime } = useGlobalContext();

  const {
    isFetching,
  } = useGetQuiz({
    onSuccess: () => {
      navigate('/quiz/0');
      setStartTime();
    },
  });

  useInterval(() => {
    if (isFetching) {
      setDots((prev) => {
        if (prev.length >= 3) {
          return '.';
        }

        return prev.concat('.');
      });
    }
  }, isFetching ? 300 : null);

  return <div className="w-full h-full flex justify-center items-center text-[40px]">{`Loading${dots}`}</div>;
}

export { Loading };
