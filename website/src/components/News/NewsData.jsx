import { useEffect, useState } from "react";
// TODO make this work with the API instead of the JSON file
import jsonData from "../../articles.json";
import { NewsArticle } from "./NewsArticle";

//Cuts off the title of articles that are over 70 characters to prevent cut-offs, then appends "..." to them.
function title_format(title) {
  var string1 = JSON.stringify(title).replace(/['"]+/g, "");
  //Ensures cut-off titles end on a space.
  if (string1.length > 70) {
    string1 = string1.slice(0, 70);
    var i = string1.length;
    while (string1.charAt(i) !== " ") {
      i--;
    }
    string1 = string1.slice(0, i) + "...";
  }
  return string1;
}

//Takes the current date and the date of the article and returns the difference in an ideal unit of time to display.
const date_format = (article_date) => {
  const date1 = new Date();
  const date2 = new Date(article_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return diffDays + " days ago";
  } else if (diffDays >= 7 && diffDays < 14) {
    return "1 week ago";
  } else if (diffDays >= 14 && diffDays < 21) {
    return "2 weeks ago";
  } else if (diffDays >= 21 && diffDays < 28) {
    return "3 weeks ago";
  } else {
    return "Over a month ago";
  }
};

export const NewsData = (props) => {
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let arr = [];
  while (arr.length < props.articles) {
    var r = Math.floor(Math.random() * 290) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);

  return (
    <div className="flex h-full w-full flex-wrap justify-between gap-4">
      {loading
        ? "Loading..."
        : arr.map((num) => {
            const article = jsonData.articles[num];
            return (
              <NewsArticle
                date={date_format(article.publishedAt)}
                url={article.url}
                urlToImage={article.urlToImage}
                title={article.source.name + ": " + title_format(article.title)}
              />
            );
          })}
    </div>
  );
};
