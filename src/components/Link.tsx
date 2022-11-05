import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

interface LinkProps extends React.AnchorHTMLAttributes<any> {
  href: string;
  children: React.ReactElement | string;
}

function Link(props: LinkProps) {
  const { onClick, href, children } = props;
  const navigate = useNavigate();

  const handleAnchorClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    navigate(href);
  };

  const handleAnchorKeyEvent: KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    if (e.key === 'Enter') {
      navigate(href);
    }
  };

  return <a {...props} role="link" tabIndex={0} onClick={handleAnchorClick} onKeyUp={handleAnchorKeyEvent}>{children}</a>;
}

export { Link };
