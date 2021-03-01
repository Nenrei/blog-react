import React, { useEffect, useState, useRef } from "react";
import Slider from "../../components/slider/slider";
import Sidebar from "../../components/sidebar/sidebar";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import {
  getArticleById,
  getImage,
  insertArticle,
  updateArticle,
	removeArticle,
  uploadImage,
} from "../../services/article-services";
import imgDefault from "../../../images/default.jpg";
import "./article-create-view.scss";

const ArticleCreateView = (params) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const [status, setStatus] = useState("waiting");
  const [selectedFile, setSelectedFile] = useState(null);

  const titleRef = useRef();
  const contentRef = useRef();

  const getArticle = () => {
    const articleId = params.match.params.id;
    getArticleById(articleId)
      .then((resArticle) => {
        setArticleData(resArticle);
        setLoading(false);
        console.log(articleData);
        console.log(resArticle);
      })
      .catch((catchedError) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (params.match.params.id) {
      getArticle();
    }
  }, []);

  const saveArticle = (event) => {
    event.preventDefault();

    changeState();

		console.log(articleData);

    if (params.match.params.id) {
      updateArticle(articleData)
        .then((resArticle) => {
          saveCallback(resArticle);
        })
        .catch((resError) => {
          errorCallback(resError);
        });
    } else {
      insertArticle(articleData)
        .then((resArticle) => {
          saveCallback(resArticle);
        })
        .catch((resError) => {
          errorCallback(resError);
        });
    }
  };

  const saveCallback = (resArticle) => {
    setStatus("waiting");
    setArticleData(resArticle);

    if (selectedFile !== null) {
      console.log(articleData);
      console.log(resArticle);

      const articleId = articleData._id;
      const formData = new FormData();
      formData.append("file0", selectedFile, selectedFile.name);

      uploadImage(articleId, formData)
        .then((resArticle) => {
          setArticleData(resArticle);
					swal(
						"Success",
						"The entry was saved successfully",
						"success"
					);
          setStatus("success");
        })
        .catch((resError) => {
          setStatus("failed");
          swal(
            "Something gone wrong",
            "There was an error and the image was not saved correctly",
            "error"
          );
        });
    } else {
			swal(
				"Success",
				"The entry was saved successfully",
				"success"
			);
      setStatus("success");
    }
  };

  const errorCallback = (resError) => {
    setStatus("failed");
    setError(resError);

    swal(
      "Something gone wrong",
      "There was an error and the entry was not saved correctly",
      "error"
    );
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
				console.log(articleData._id);
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
					.catch((resError) => {
						
					});
      } else {
        swal(
          "The entry was not removed",
          "",
          "success"
        );
      }
    });
  };

  const fileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const changeState = (event) => {
    if (status !== "wainting") {
      setArticleData({
        title: titleRef.current.value,
        content: contentRef.current.value,
        contentShort: contentRef.current.value ? `${contentRef.current.value.substring(0, 90)} ...` : ``,
        image: null
      });
    }
  };

  return (
    <>

			{(status === "deleted" || status === "success") && <Redirect to="/blog" />}

      <Slider
        title={params.match.params.id ? "Update Article" : "New Article"}
        size="small"
      />

      <div className="content">
        <div className="content__body">
          <form
            className="mid-form article-create"
            onSubmit={saveArticle}
            onChange={changeState}
          >
            <div className="mid-form__form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={articleData.title}
                ref={titleRef}
              />
            </div>

            <div className="mid-form__form-group">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                defaultValue={articleData.content}
                ref={contentRef}
              ></textarea>
            </div>

            <div className="mid-form__form-group">
              <div className="article-create__image">
                <label htmlFor="file0">Image</label>
                {articleData.image && (
                  <img
                    src={getImage(articleData.image)}
                    alt={articleData.title}
                  />
                )}
              </div>
              <input type="file" name="file0" onChange={fileChange} />
            </div>

            <input type="submit" value="Guardar" className="btn btn-success" />
          </form>
        </div>
        <Sidebar
          inArticle="true"
          saveArticle={saveArticle}
          deleteArticle={deleteArticle}
        />
      </div>
    </>
  );
};

export default ArticleCreateView;
