export const Modal = (props) => {
  return (
    <div
      className={`h-100 w-100 fixed inset-x-0 inset-y-0 z-20 m-auto bg-black bg-opacity-60 ${
        !props.visible && "hidden"
      }`}
    >
      <div className="fixed inset-y-[12.5%] inset-x-1/4 flex h-3/4 w-full w-1/2 flex-col rounded bg-neutral-100 bg-opacity-100 p-4 shadow-xl">
        <div className="w-100 flex justify-end">
          <button onClick={() => props.setVisible(false)} className="">
            X
          </button>
        </div>
        <div className="flex flex-col">{props.children}</div>
      </div>
    </div>
  );
};
