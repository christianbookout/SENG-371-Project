export const NewsArticle = (props) => {
  return (
    <div className="h-60 w-[30%] rounded-2xl bg-gray-900 shadow-md shadow-black">
      <div className="flex h-full w-full flex-col justify-center gap-3 p-4 text-sm text-slate-100">
        <a
          href={props.url}
          target="blank"
          className="font-bold hover:underline"
        >
          {props.title}
        </a>
        <img
          src={props.urlToImage}
          alt=""
          className="h-32 w-64 rounded-lg object-cover"
        />
        <p className="w-full text-right text-sm text-slate-500">{props.date}</p>
      </div>
    </div>
  );
};
