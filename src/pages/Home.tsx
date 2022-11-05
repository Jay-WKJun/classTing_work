import React from 'react';
import { Link } from '@/components/Link';

function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%]">Classting Quiz!</h1>
      <div className="flex justify-center items-center flex-1">
        <Link className="flex justify-center items-center font-bold w-fit h-[1.5em] rounded-xl text-[40px] px-[10px] bg-red-300 hover:translate-y-[-10%] transition-transform" href="/loading">시작하기</Link>
      </div>
    </div>
  );
}

export { Home };
