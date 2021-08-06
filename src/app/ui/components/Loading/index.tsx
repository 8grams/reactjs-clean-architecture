import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
      <div className="w-full h-60 rounded-md animate-pulse bg-sweetblack" />
      <div className="w-full h-60 rounded-md animate-pulse bg-sweetblack" />
      <div className="w-full h-60 rounded-md animate-pulse bg-sweetblack hidden md:block" />
      <div className="w-full h-60 rounded-md animate-pulse bg-sweetblack hidden lg:block" />
      <div className="w-full h-60 rounded-md animate-pulse bg-sweetblack hidden xl:block"/>
    </div>
  );
};
