import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetQuiz } from '@/hooks/useGetQuiz';
import useInterval from '@/hooks/useInterval';

function Loading() {
  const [dots, setDots] = useState('.');
  const navigate = useNavigate();

  const {
    data, isFetching, isFetched,
  } = useGetQuiz();

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

  useEffect(() => {
    if (isFetched && data) {
      navigate('/quiz/1');
    }
  }, [isFetched, navigate, data]);

  return <div className="w-full h-full flex justify-center items-center">{`Loading${dots}`}</div>;
}

export { Loading };
