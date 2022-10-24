import React from 'react';

function Article({ children, id }: { children: JSX.Element; id?: string }) {
  return (
    <article id={id} className="relative">
      <div className="absolute top-0 left-0 w-0 h-0 border-l-0 border-r-[55vw] border-x-transparent border-t-[4vh] md:border-t-[8vh] dark:border-t-secondary-dark border-t-secondary duration-500" />
      <div className="relative flex flex-wrap w-full md:items-center justify-around min-h-[100vh] md:min-h-[93vh] md:max-h-80vh m-auto md:max-w-screen py-12 md:py-20 px-6 md:px-8">
        <div className="flex flex-col w-full xl:w-[80vw] 2xl:w-[75vw]">
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-r-0 border-l-[99vw] border-x-transparent border-b-[4vh] md:border-b-[8vh] dark:border-b-accent-dark border-b-accent duration-500" />
    </article>
  );
}

export default Article;
