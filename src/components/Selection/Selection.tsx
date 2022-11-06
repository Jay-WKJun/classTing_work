import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

import styles from './Selection.module.scss';

interface SelectionProps {
  content: string;
  className?: string;
  state?: 'correct' | 'inCorrect' | null;
  onClick?: MouseEventHandler;
}

function Selection({
  content,
  className,
  state,
  onClick,
}: SelectionProps) {
  return (
    <button
      type="button"
      className={classNames('flex items-center w-full px-[20px] py-[5px] border-[2px] border-black rounded-full cursor-pointer font-bold', styles.wrapper, { [styles.correct]: state === 'correct' }, { [styles.incorrect]: state === 'inCorrect' }, className)}
      onClick={onClick}
    >
      <div className={classNames('w-[15px] h-[15px] mr-[10px] rounded-full content-none', styles.button)} />
      <span>{content}</span>
    </button>
  );
}

export { Selection };
