from get_articles import ArticleReader
from get_articles import NewsArticle

article = ArticleReader("./test/test_articles.json")

class TestNewsArticle:
    def test_get_zero_articles(self):
        assert article.get_random_articles(0) == [], "get_random_articles did not return an empty list when 0 articles were requested"
    
    def test_article_correctness(self):
        articles = article.get_random_articles(10)

        assert len(articles) == 10, "The number of articles is not 10 when 10 were requested"
        
        def article_is_correct(article):
            print(article)
            return (isinstance(article, NewsArticle)
                    and article.title is not None
                    and article.url_to_image is not None)
        
        assert all(map(article_is_correct, articles)),  "Article content is not stored correctly"

    def test_abreviate_title(self):
        articles = article.get_random_articles(10)

        assert all(len(article.title) <= 90 for article in articles)

