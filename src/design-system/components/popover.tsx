import type { ReactNode } from 'react';
import { useState } from 'react';

interface PopoverProps {
  children: ReactNode;
  popover: ReactNode;
}

export default function Popover({ children, popover }: PopoverProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <div
        className={`absolute bottom-[120%] w-fit transition-all duration-200 pointer-events-none ${hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
      >
        <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-1 shadow-lg">{popover}</div>
      </div>
    </div>
  );
}
