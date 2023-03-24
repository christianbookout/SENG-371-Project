import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Content = (props) => {
  return (
    <div className="flex h-screen w-screen bg-neutral-100">
      <Sidebar balance={21000} />
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-min w-full flex-col items-start justify-center p-8 pb-0">
          <h1 className="text-2xl">{props.title}</h1>
          <div className="my-2 h-0.5 w-full rounded bg-gray-300 px-16" />
        </div>
        <div className="no-scrollbar my-2 flex h-full w-full overflow-hidden overflow-y-scroll rounded px-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};
