import React from "react";

export const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className="font-semibold text-2xl tracking-wider">{title}</h1>;
};
