import React from 'react';
import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@/components/Link';

function Home() {
  const { data } = useQuery(['quizs'], () => Axios.request({ method: 'GET', url: 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple' }).then((res) => res.data));

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%]">Classting Quiz!</h1>
      <div className="flex justify-center items-center flex-1">
        <Link className="flex justify-center items-center font-bold w-fit h-[1.5em] rounded-xl text-[40px] px-[10px] bg-red-300 hover:translate-y-[-10%] transition-transform" href="/quiz">시작하기</Link>
      </div>
    </div>
  );
}

export { Home };
