import React from "react";

export const Wrapper: React.FC = ({ children }) => {
  return <div className="w-full flex flex-col space-y-4">{children}</div>;
};
