export const NewsArticle = (props) => {
    return (
        <div className="w-[30%] h-60 rounded-2xl shadow-md shadow-black bg-gray-900">
            <div className="flex flex-col justify-center w-full h-full p-4 gap-3 text-sm text-slate-100">
                <a href= {props.url} target="blank" class="font-bold hover:underline">{props.title}</a>
                <img src = {props.urlToImage} alt="" className="h-32 w-64 object-cover rounded-lg"/>
                <p class="w-full text-sm text-right text-slate-500">{props.date}</p>
            </div>
        </div>
    )
} 

