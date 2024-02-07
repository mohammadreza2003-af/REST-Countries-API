import React, { type ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen font-nunito max-w-[1300px] mx-auto">
      {children}
    </div>
  );
}

export default Container;
