import { Sidebar } from "./Sidebar";

export const Content = (props) => {
  return (
    <div className="flex h-screen w-screen bg-neutral-100">
      <Sidebar />
      <div className="flex w-full flex-col">
        <div className="flex h-min w-full flex-col items-start justify-center p-8 pb-0">
          <h1 className="text-2xl">{props.title}</h1>
          <div className="my-2 h-0.5 w-full rounded bg-gray-300 px-16" />
        </div>
        <div className="flex h-full w-full px-8 pt-2">{props.children}</div>
      </div>
    </div>
  );
};
