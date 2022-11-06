import React from 'react';

import { Link } from '@/components/Link';
import { FallbackProps } from 'react-error-boundary';

interface ErrorBoundaryProps extends FallbackProps {}

function ErrorBoundary({ error, resetErrorBoundary }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-[30px] font-bold mb-[30px]">에러가 발생했습니다. 😿</span>
      <Link
        href="/"
        className="w-fit h-fit px-[30px] py-[10px] border-black border-[1px] rounded-xl cursor-pointer"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export { ErrorBoundary };
