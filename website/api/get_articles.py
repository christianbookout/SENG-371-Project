import json
import random

class NewsArticle:
    def __init__(self, title, author, description, url, url_to_image, published_at, content):
        self.title = title
        self.author = author
        self.description = description
        self.url = url
        self.url_to_image = url_to_image
        self.published_at = published_at
        self.content = content

    def __str__(self):
        return f"Title: {self.title} by: {self.author}"

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

class ArticleReader:
    def __init__(self, filepath : str):
        self.filepath = filepath
        self.json_content = ArticleReader.read_json_file(self.filepath)
        self.article_list = self.json_content["articles"]

    def get_random_articles(self, num_articles : int) -> list:
        """Returns a list with size numArticles of random NewsArticles from the json file"""
        article_list = []
        articles = self.article_list.copy()
        for _ in range(0, num_articles):
            index = random.randint(0, len(articles)-1)
            # Ensure no duplicate articles are pulled
            article = articles.pop(index)
            new_article = NewsArticle( title       = article["title"]
                                    , author       = article["author"]
                                    , description  = article["description"]
                                    , url          = article["url"]
                                    , url_to_image = article["urlToImage"]
                                    , published_at = article["publishedAt"]
                                    , content      = article["content"]
                                    )
            article_list.append(new_article)
        return article_list

    @staticmethod
    def read_json_file(filepath: str) -> dict:
        """Reads a json file and returns the data as a dictionary"""
        with open(filepath, encoding="utf-8") as file:
            json_content = json.load(file)
            for article in json_content["articles"]:
                article["title"] = ArticleReader.abbreviate_title(article["title"])
            return json_content

    @staticmethod
    def abbreviate_title(title : str) -> str:
        if len(title) > 90:
            title = title[:50] + "..."
        return title