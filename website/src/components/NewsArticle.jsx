export const NewsArticle = (props) => {
    return (
        <div className="w-[30%] h-60 rounded-2xl shadow-xl bg-gray-900">
            <div className="flex flex-col justify-center w-full h-full p-4 gap-4 text-sm text-slate-100">
                <p class="font-bold">{props.title}</p>
                <img src = {props.urlToImage} alt="" className="h-32 w-64 object-cover rounded-lg"/>
            </div>
        </div>
    )
} 

