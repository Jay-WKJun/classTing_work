import { Selection } from '@/components/Selection/Selection';
import { useGetQuiz } from '@/hooks/useGetQuiz';
import React from 'react';
import { useParams } from 'react-router';

function Quiz() {
  const params = useParams();
  const { id } = params;

  const { currentQuiz } = useGetQuiz({ index: Number(id) });

  return (
    <div className="flex flex-col w-full h-full">
      <section className="flex items-end h-[30%]">
        <h1 className="text-center">{currentQuiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col child/Wo.first:mt-[20px]">
          {
            currentQuiz?.selections.map((selection) => (
              <Selection content={selection} />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export { Quiz };
