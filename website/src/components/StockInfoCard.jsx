export const StockInfoCard = (props) => {
  return (
    <div className="flex h-full w-full flex-col p-2 text-left">
      <p className="">
        {props.title}: ${props.price}
      </p>
    </div>
  );
};
