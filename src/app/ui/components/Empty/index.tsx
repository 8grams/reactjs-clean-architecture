import React from "react";
import { ReactComponent as EmptyIcon } from "../../assets/svg/Empty.svg";

export const Empty: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center pt-20">
      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="w-1/3">
          <EmptyIcon />
        </div>
        <p className="text-center">No Data</p>
      </div>
    </div>
  );
};
