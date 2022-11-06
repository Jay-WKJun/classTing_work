import React, { MouseEvent } from 'react';

import type { QuizModel } from '@/models/QuizModel';
import type { SelectionModel } from '@/models/SelectionModel';
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
  hold?: boolean;
  quiz: QuizModel | null;
  isSelected?: boolean;
  onClick?: (e: MouseEvent<Element>) => void;
}

function QuizSelections({
  hold,
  quiz,
  isSelected = false,
  onClick,
}: QuizSelectionsProps) {
  return (
    <div className="flex flex-col w-full h-fit gap-[30px]">
      <section className="flex items-center h-[40%]">
        <h1 className="text-center">{quiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-[20px]">
          {
            quiz?.selections.map((selection, i) => (
              <Selection
                hold={hold}
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
