export const StockInfo = (props) => {
  return (
    <div className="my-4 flex h-full w-full flex-col">
      <div className="flex w-full flex-col">
        <p className="w-full text-left text-3xl">AAPL</p>
        <p className="w-full text-left text-sm">Apple Inc.</p>
      </div>
      <div className="grid h-full w-full grid-cols-3">
        <div className="rows-2 cols-2 flex h-full w-full bg-gray-700"></div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
          return <div className="flex h-full w-full bg-gray-700"></div>;
        })}
      </div>
    </div>
  );
};
