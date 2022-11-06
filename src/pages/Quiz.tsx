import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Selection } from '@/components/Selection/Selection';
import { useGetQuiz } from '@/hooks/useGetQuiz';
import { useTimeout } from '@/hooks/useTimeout';
import { Selection as SelectionModel } from '@/models/Selection';

function getSelectionState(selection: SelectionModel, isSelected: boolean) {
  const state = selection.getThisSelectionState();

  if (isSelected && selection.isCorrect) {
    return 'correct';
  }

  if (state === 'not selected') {
    return null;
  }

  return state;
}

function Quiz() {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { currentQuiz, data, isFetched } = useGetQuiz({ index: Number(id) });

  useEffect(() => {
    if (!id || Number.isNaN(Number(id))) {
      return navigate('/');
    }

    if (isFetched && !data) {
      navigate('/');
    }
  }, [isFetched, data, navigate, id]);

  useTimeout(() => {
    if (id) {
      const numbedId = Number(id);
      if (numbedId + 1 === currentQuiz?.getSelectionsLength()) {
        return navigate('result');
      }

      navigate(`quiz/${numbedId + 1}`);
    }
  }, isSelected ? 1000 : null);

  return (
    <div className="flex flex-col w-full h-full">
      <section className="flex items-end h-[30%]">
        <h1 className="text-center">{currentQuiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col child/Wo.first:mt-[20px]">
          {
            currentQuiz?.selections.map((selection, i) => (
              <Selection
                content={selection.content}
                state={getSelectionState(selection, isSelected)}
                onClick={() => {
                  selection.selectThis();
                  currentQuiz.selectIndex(i);
                  setIsSelected(true);
                }}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export { Quiz };
