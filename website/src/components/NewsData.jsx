import { useEffect, useState } from "react"
import jsonData from "./articles.json"
import { NewsArticle } from "./NewsArticle"

//Cuts off the title of articles that are over 90 characters to prevent cut-offs, then appends "..." to them.
function title_format(title){
    var string1 = JSON.stringify(title).replace(/['"]+/g, '')
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

    let arr = [];
    while(arr.length < props.articles){
        var r = Math.floor(Math.random() * 290) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);


    return (
            <div className="flex flex-wrap gap-4 w-full h-full justify-between">
                { loading ? "Loading..." : 
                    arr.map(num => {
                        const article = jsonData.articles[num]
                        return <NewsArticle urlToImage={article.urlToImage} title={title_format(article.title)}/>
                    })
                }
            </div>
    )
}