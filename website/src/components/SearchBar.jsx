export const SearchBar = (props) => {
  return (
    <div className="flex h-10 w-full flex-row">
      <input
        type="text"
        className="h-full w-full rounded-lg bg-white p-2 text-left text-black shadow-lg hover:bg-blue-50"
        placeholder="Search"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};
