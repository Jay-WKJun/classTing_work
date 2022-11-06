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
  );
}

export { QuizSelections };
