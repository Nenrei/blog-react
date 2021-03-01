import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLastArticles, getArticlesBySearch, getArticles, getImage } from '../../services/article-services'
import Moment from 'react-moment';
import imgDefault from '../../../images/default.jpg';

import './articles.scss';

const Articles = (params) => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getHomeArticles = () => {
    getLastArticles()
      .then((res) => {
        setArticles(res.articles);
        setLoading(false);
      })
      .catch((catchedError) => {
        setError(true);
        setLoading(false);
      });
  };

  const getSearchArticles = () => {
    getArticlesBySearch(params.searchText)
      .then((res) => {
        setArticles(res.articles);
        setLoading(false);
      })
      .catch((catchedError) => {
        setError(true);
        setLoading(false);
      });
  };

  const getAllArticles = () => {
    getArticles()
      .then((res) => {
        setArticles(res.articles);
        setLoading(false);
      })
      .catch((catchedError) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    
    setError(false);
    setLoading(true);

    if (params.home === "true") {
      getHomeArticles();
    } else if (params.searchText) {
      getSearchArticles();
    } else {
      getAllArticles();
    }

  }, []);


  return (
    <div className="articles">

      {
        loading && !error &&
        <div>
          <h3 className="status-title"> Loading entries ...</h3>
          <h3 className="status-title status-title--small"> Wait a moment.</h3>
        </div>
      }

      {!loading && error && 
        <div>
          <h3 className="status-title"> No entries found. </h3>
          <h3 className="status-title status-title--small"> Try again later.</h3>
        </div>
      }

      {
        !loading && !error && articles.length > 0 &&
        articles.map((article) => {
          return (
            <article className="articles__item" key={article._id}>
              <div className="articles__item__image">
                {article.image ?
                  (
                    <img src={getImage(article.image)} alt={article.title} />
                  ) : (
                    <img src={imgDefault} alt={article.title} />
                  )
                }
              </div>

              <h2>{article.title}</h2>
              <span className="articles__item__date">
                Published <Moment locale="en" fromNow>{article.date}</Moment>
              </span>
              <span className="articles__item__content">
                {article.contentShort}
              </span>
              <Link to={'/blog/entry/' + article._id}>Read more...</Link>

              <div className="clearfix"></div>

            </article>
          )
        })
      }

    </div>
  );


}

export default Articles;