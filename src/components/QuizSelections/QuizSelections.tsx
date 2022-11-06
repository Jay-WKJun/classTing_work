import React, { MouseEvent } from 'react';

import { QuizModel } from '@/models/QuizModel';
import { SelectionModel } from '@/models/SelectionModel';
import { Selection } from '@/components/Selection/Selection';

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

interface QuizSelectionsProps {
  quiz: QuizModel | null;
  isSelected?: boolean;
  onClick?: (e: MouseEvent<Element>) => void;
}

function QuizSelections({
  quiz,
  isSelected = false,
  onClick,
}: QuizSelectionsProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <section className="flex items-center h-[40%]">
        <h1 className="text-center">{quiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col child/Wo.first:mt-[20px]">
          {
            quiz?.selections.map((selection, i) => (
              <Selection
                content={selection.content}
                state={getSelectionState(selection, isSelected)}
                onClick={(e) => {
                  selection.selectThis();
                  quiz.selectIndex(i);

                  if (onClick) {
                    onClick(e);
                  }
                }}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export { QuizSelections };
