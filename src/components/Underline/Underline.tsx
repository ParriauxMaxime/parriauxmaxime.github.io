import React, { useState } from 'react';

export interface UnderlineProps {
  children: JSX.Element | string;
}

const DURATION = 400;

export default function Underline({ children }: UnderlineProps) {
  const [run, setRun] = useState(false);
  const onMouseEnter = () => {
    if (!run) {
      setTimeout(() => setRun(false), DURATION);
      setRun(true);
    }
  };

  return (
    <div onMouseEnter={onMouseEnter} className="relative h-fit w-fit">
      <div>{children}</div>
      <div className="absolute overflow-hidden bottom-[-10%] w-full h-[10%] rounded-lg bg-secondary  dark:bg-accent-dark ">
        <div
          style={{ display: !run ? 'none' : 'block' }}
          className={`relative left-[-60%] w-[60%] h-full bg-accent dark:bg-secondary rounded-full animate-[underline_0.4s_linear_infinite]`}
        ></div>
      </div>
    </div>
  );
}
