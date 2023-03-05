import json
import random

class ArticleReader:
    def __init__(self, filepath : str):
        self.filepath = filepath
        self.article_list = ArticleReader.read_json_file(self.filepath)

    def get_random_articles(self, num_articles : int) -> list:
        """Returns a list with size num_articles of random articles from the json file"""
        article_list = []
        articles = self.article_list.copy()
        for _ in range(0, num_articles):
            index = random.randint(0, len(articles)-1)
            # Ensure no duplicate articles are pulled
            article = articles.pop(index)
            
            article_list.append(article)
        return article_list

    @staticmethod
    def read_json_file(filepath: str) -> list:
        """Reads a json file and returns the data as a dictionary"""
        with open(filepath, encoding="utf-8") as file:
            json_content = json.load(file)
            articles = []
            for article in json_content["articles"]:
                article["title"] = ArticleReader.truncate_title(article["title"])
                articles.append(article)
            return articles

    @staticmethod
    def truncate_title(title : str) -> str:
        """Truncates the title to 90 characters and adds an ellipsis if it is longer than 90 characters"""
        if len(title) > 90:
            title = title[:50] + "..."
        return title