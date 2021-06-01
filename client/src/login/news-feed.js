import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsFeed() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiKey = "25efdd588d874eb5811036a5b2fefc29";

    const news = `https://newsapi.org/v2/top-headlines?country=us&apiKey=25efdd588d874eb5811036a5b2fefc29&pageSize=10`;

    useEffect(() => {
        setLoading(true);

        axios
            .get(news)
            .then((response) => {
                console.log("response: ", response.data.articles);
                setArticles(response.data.articles);
            })
            .catch((err) => {
                console.log("Error fetching news API: ", err);
                setLoading(false);
            });
    }, [setArticles]);
    // console.log("articles: ", articles);

    return (
        <>
            <div className="bg-info">
                <h1>News Feed</h1>
                <div>
                    {articles.map((articles) => {
                        // console.log("title:", title)
                        // console.log("articles: ", articles);
                        return (
                            <div>
                                <img
                                    src={
                                        articles.urlToImage ||
                                        "/images/Swap.png"
                                    }
                                    className="news-img"
                                />
                                <div>
                                    <h3>
                                        <a href={articles.url}>
                                            {articles.title}
                                        </a>
                                    </h3>
                                    <p>{articles.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
