import React, { useState, useEffect } from "react";
import { getArticleById, getImage, removeArticle } from "../../services/article-services";
import Sidebar from "../../components/sidebar/sidebar";
import imgDefault from "../../../images/default.jpg";
import Moment from "react-moment";
import swal from "sweetalert";
import "./article-detail-view.scss";
import { Redirect } from "react-router-dom";

const ArticleDetailView = (params) => {
  const [status, setStatus] = useState("");
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
  };

  const deleteArticle = () => {
    swal({
      title: "¿Are you sure?",
      text: "Once removed, it cannot be recovered",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeArticle(articleData._id)
          .then((resArticle) => {
            setArticleData(resArticle);
            swal(
              "Entry removed",
              "The entry was removed successfully",
              "success"
            );
            setStatus("deleted");
          })
          .catch((resError) => {});
      } else {
        swal("The entry was not removed", "", "success");
      }
    });
  };

  useEffect(() => {
    setError(false);
    setLoading(true);
    getArticle();
  }, []);

  return (
    <>
      <div className="content">
        <div className="content__body">

          {status === "deleted" && <Redirect to="/blog" />}

          {!loading && !error && articleData.title && (
            <article className="article-detail">
              <div className="article-detail__image">
                {articleData.image ? (
                  <img
                    src={getImage(articleData.image)}
                    alt={articleData.title}
                  />
                ) : (
                  <img src={imgDefault} alt={articleData.title} />
                )}
              </div>
              <h1 className="subheader">{articleData.title}</h1>

              <span className="article-detail__date">
                Published{" "}
                <Moment locale="en" fromNow>
                  {articleData.date}
                </Moment>
              </span>

              <span className="article-detail__content">
                {articleData.content}
              </span>

              <div className="clearfix"></div>
            </article>
          )}
        </div>
        {!loading && !error && articleData.title ? (
          <Sidebar article="true" articleData={articleData} deleteArticle={deleteArticle} />
        ) : (
          <Sidebar article="false" />
        )}
      </div>
    </>
  );
};

export default ArticleDetailView;
