import { useEffect, useState } from "react"
import jsonData from "./articles.json"

//Cuts off the title of articles that are over 90 characters to prevent cut-offs, then appends "..." to them.
function title_format(data, number){
    var string1 = JSON.stringify(data.articles[number].title).replace(/['"]+/g, '')
    if(string1.length > 90){ 
        string1 = string1.slice(0, 90) + "..."
    }
    return string1
}


export const NewsData = (props) => {
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
            setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

//Variables for randomizing which articles are pulled from articles.json.
var first = Math.floor(Math.random()*(300));
var second = Math.floor(Math.random()*(300));
var third = Math.floor(Math.random()*(300));

    return (
        <div className="flex flex-row gap-4 w-full h-full">

            <div className="w-full h-60 rounded-2xl shadow-xl bg-gray-900">
                <div className="flex flex-col justify-center w-full h-full p-4 gap-4 text-sm text-slate-100">
                    {loading ? "loading" : <p class="font-bold">{title_format(jsonData, first)}</p>}
                    <img src = {jsonData.articles[first].urlToImage} alt="" className="h-32 w-64 object-cover rounded-lg"/>
                </div>
            </div>

            <div className="py-4 w-full h-60 rounded-2xl shadow-xl bg-gray-900">
                <div className="flex flex-col justify-center w-full h-full p-4 gap-4 text-sm text-slate-100">
                    {loading ? "loading" : <p class="font-bold">{title_format(jsonData, second)}</p>}
                    <img src = {jsonData.articles[second].urlToImage} alt="" className="h-32 w-64 object-cover rounded-lg"/>
                </div>
            </div>

            <div className="py-4 w-full h-60 rounded-2xl shadow-xl bg-gray-900">
            <div className="flex flex-col justify-center w-full h-full p-4 text-sm gap-4 text-slate-100">
                    {loading ? "loading" : <p class="font-bold">{title_format(jsonData, third)}</p>}
                    <img src = {jsonData.articles[third].urlToImage} alt="" className="h-32 w-64 object-cover rounded-lg"/>
                </div>
            </div>
        </div>
        
    )
}