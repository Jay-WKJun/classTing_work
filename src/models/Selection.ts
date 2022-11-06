export interface SelectionInput {
  content: string;
  index: number;
  isCorrect: boolean;
}

class Selection {
  content: string;

  isSelected = false;

  index: number;

  isCorrect: boolean;

  constructor({
    content,
    index,
    isCorrect,
  }: SelectionInput) {
    this.content = content;
    this.index = index;
    this.isCorrect = isCorrect;
  }

  selectThis = () => {
    this.isSelected = true;
  };

  getThisSelectionState = () => {
    if (!this.isSelected) {
      return 'not selected';
    }

    if (this.isCorrect) {
      return 'correct';
    }

    return 'inCorrect';
  };
}

export { Selection };
