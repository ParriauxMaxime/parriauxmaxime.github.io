import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

import './Rocket.css';

export default function Rocket() {
  const [hide, setHide] = useState(false);
  const [run, setRun] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [ignition, setIgnition] = useState(false);
  const [isMobile, setIsMobile] = useState(
    !window.matchMedia('(min-width: 768px)').matches
  );
  const onClick = useCallback(() => {
    setRun(true);
    setIgnition(true);

    const now = Date.now();
    const interval = setInterval(() => {
      if (document.documentElement.scrollTop > 0 && Date.now() - now <= 1000) {
        document.documentElement.scrollBy({ top: -50 });
      } else {
        clearInterval(interval);
        setTimeout(
          () => {
            setHide(true);
            setTimeout(() => {
              setHide(false);
            }, 100);
            setIgnition(false);
            setRun(false);
          },
          isMobile ? 900 : 600
        );
      }
    }, 10);
  }, []);

  useLayoutEffect(() => {
    const scrollHandler = () => {
      const scroll = document.documentElement.scrollTop;
      setFixed(scroll > document.documentElement.clientHeight - 58);
    };
    const resizeHandler = () => {
      setIsMobile(!window.matchMedia('(min-width: 768px)').matches);
    };
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          display: hide ? 'none' : 'block',
          transition: ignition
            ? `bottom ${isMobile ? '0.9s' : '0.6s'} ease-in`
            : 'bottom 0.2s ease-in-out',
          bottom: ignition
            ? document.documentElement.clientHeight * 1.5
            : fixed
            ? isMobile
              ? 10
              : 55
            : -200,
        }}
        onClick={onClick}
        className="rocket right-[0px] md:right-[30px]"
      >
        <div
          onMouseEnter={() => {
            setRun(true);
          }}
          onMouseLeave={() => {
            if (!ignition) setRun(false);
          }}
          className={`rocket-body ${run ? 'rocket-body--run' : ''}`}
        >
          <div className="body"></div>
          <div className="fin fin-left"></div>
          <div className="fin fin-right"></div>
          <div className="window"></div>
        </div>
        <div
          className={`exhaust-flame ${run ? 'exhaust-flame--run' : ''}`}
        ></div>
        <ul className="exhaust-fumes">
          {run && (
            <>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              {/* <li></li> */}
              <li></li>
              <li></li>
              <li></li>
            </>
          )}
        </ul>
      </div>
      <ul className="star">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}
