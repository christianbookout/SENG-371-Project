import json
import random


class NewsArticle:
    def __init__(self, title, author, description, url, urlToImage, publishedAt, content):
        self.title = title
        self.author = author
        self.description = description
        self.url = url
        self.urlToImage = urlToImage
        self.publishedAt = publishedAt
        self.content = content

    def __str__(self):
        return f"Title: {self.title} by: {self.author}"
    
filepath = "./articles.json"

def readJsonFile(filename):
    """Reads a json file and returns the data as a dictionary"""
    with open(filename, encoding="utf-8") as file:
        return json.load(file)
 
def getArticleList(jsonfile, numArticles):
    """Takes a json file and returns a list of NewsArticle objects of a given length"""
    numlist = []
    i=0
    while i<numArticles:
        numlist.append(random.randint(0, len(jsonfile["articles"])))
        i = i+1
        articleList = []
    for num in numlist:
        newArticle = NewsArticle(jsonfile["articles"][num]["title"], jsonfile["articles"][num]["author"], jsonfile["articles"][num]["description"], jsonfile["articles"][num]["url"], jsonfile["articles"][num]["urlToImage"], jsonfile["articles"][num]["publishedAt"], jsonfile["articles"][num]["content"])
        articleList.append(newArticle)
    return articleList


def abreviateTitle(articleList):
    for articles in articleList:
        if len(articles.title) > 90:
            articles.title = articles.title[:50] + "..."
    return articleList

def main():
    jsonDict = readJsonFile(filepath)
    articleList = getArticleList(jsonDict, 9)
    articleList = abreviateTitle(articleList)
if __name__ == "__main__":
    main()