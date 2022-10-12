import React, { createRef, useEffect, useRef, useState } from 'react';

export interface PopoverProps {
  children: JSX.Element;
  popover: JSX.Element | string;
}

export default function Popover({ children, popover }: PopoverProps) {
  const ref = createRef<HTMLDivElement>();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const enterHandler = () => {
      setHover(true);
    };
    const leaveHandler = () => {
      setHover(false);
    };
    ref.current?.addEventListener('mouseenter', enterHandler);
    ref.current?.addEventListener('mouseleave', leaveHandler);

    return () => {
      ref.current?.removeEventListener('mouseenter', enterHandler);
      ref.current?.removeEventListener('mouseleave', leaveHandler);
    };
  }, []);

  return (
    <div ref={ref} className="relative flex justify-center">
      {children}
      <div
        style={{
          opacity: hover ? 1 : 0,
        }}
        className="absolute bottom-[120%] w-fit min-w-[5rem] transition-opacity duration-100"
      >
        <div className="relative text-center h-full w-full py-1 px-2 bg-secondary dark:bg-secondary-dark rounded-md">
          {popover}
        </div>
      </div>
    </div>
  );
}
