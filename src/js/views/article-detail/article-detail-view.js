import React, { useState, useEffect } from 'react';
import { getArticleById, getImage } from '../../services/article-services'
import Sidebar from '../../components/sidebar/sidebar'
import imgDefault from '../../../images/default.jpg';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './article-detail-view.scss';

const ArticleDetailView = (params) => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState({});

  const getArticle = () => {
    const articleId = params.match.params.id;
    getArticleById(articleId)
      .then((res) => {
        setArticleData(res);
        setLoading(false);
      })
      .catch((catchedError) => {
        setError(true);
        setLoading(false);
      });
  }


  useEffect(() => {
    setError(false);
    setLoading(true);
    getArticle();
  }, []);

  return (
    <>
      <div className="content">
        <div className="content__body">


          {
            !loading && !error && articleData.title &&
            <article className="article-detail">
              <div className="article-detail__image">
                {articleData.image ?
                  (
                    <img src={getImage(articleData.image)} alt={articleData.title} />
                  ) : (
                    <img src={imgDefault} alt={articleData.title} />
                  )
                }
              </div>
              <h1 className="subheader">{articleData.title}</h1>

              <span className="article-detail__date">
                Published <Moment locale="en" fromNow>{articleData.date}</Moment>
              </span>
              
              <span className="article-detail__content">
                {articleData.content}
              </span>

              <div className="clearfix"></div>
            </article>
          }




        </div>
        {
          !loading && !error && articleData.title ?
            <Sidebar article="true" articleData={articleData} /> :
            <Sidebar article="false" />
        }
      </div>
    </>
  );
}

export default ArticleDetailView;