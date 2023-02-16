import { Sidebar } from "./Sidebar";

export const Content = (props) => {
    return (
        <div className="h-screen w-screen flex bg-neutral-100">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col items-start p-8 pb-0 justify-center h-min">
          <h1 className="text-2xl">{props.title}</h1>
          <div className="w-full px-16 h-0.5 bg-gray-300 rounded my-2"/>
        </div>
        <div className="flex w-full h-full p-8"> {/* content */}
            {props.children}
        </div>
      </div>
    </div>
    )
}