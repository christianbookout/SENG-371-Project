export const Modal = (props) => {
  return (
    <div
      className={`h-100 w-100 fixed inset-x-0 inset-y-0 z-20 m-auto bg-black bg-opacity-60 ${
        !props.visible && "hidden"
      }`}
    >
      <div
        className={`fixed inset-y-[5%] inset-x-[12.5%] flex flex-col rounded bg-neutral-100 bg-opacity-100 p-4 shadow-xl ${
          props.small && "h-100 inset-y-1/4 inset-x-[37.5%] w-1/4"
        }`}
      >
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
