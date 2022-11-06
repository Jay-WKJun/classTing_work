import React from 'react';
import classNames from 'classnames';

import styles from './Selection.module.scss';

interface SelectionProps {
  content: string;
}

function Selection({
  content,
}: SelectionProps) {
  return (
    <button type="button" className={classNames('flex items-center w-full px-[20px] py-[5px] border-[2px] border-black rounded-full cursor-pointer font-bold', styles.button)}>
      <div className="w-[15px] h-[15px] mr-[10px] rounded-full content-none bg-black" />
      <span>{content}</span>
    </button>
  );
}

export { Selection };
