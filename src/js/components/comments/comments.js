import React, { useState, useRef, useEffect } from "react";
import {
  insertComment,
  getCommentsByArticle,
} from "../../services/comment-services";
import Comment from "../comment/comment";
import "./comments.scss";

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  const userRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    const articleId = props.articleId;
    getCommentsByArticle(articleId)
      .then((res) => {
        setComments(res);
      })
      .catch((catchedError) => {});
  };

  const saveComment = (event) => {
    event.preventDefault();

    const commentData = {
      userName: userRef.current.value,
      comment: commentRef.current.value,
      articleId: props.articleId,
    };

    insertComment(commentData)
      .then((resComment) => {
        getComments();
        userRef.current.value = "";
        commentRef.current.value = "";
      })
      .catch((resError) => {
      });
  };

  return (
    <div className="comments">
      <h3 className="comments__header">Comments</h3>
      <div className="comments__list">
        {(comments &&
          comments.length > 0) ?
          comments.map((comment) => {
            return <Comment key={comment._id} commentData={comment} />;
          }):
          <div className="comments__list__no-comments"> No published comments</div>
        }
      </div>
      <form className="comments__new-comment">
        <h4 className="comments__new-comment__header">New Comment</h4>
        <div className="comments__new-comment__form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" ref={userRef} />
        </div>
        <div className="comments__new-comment__form-group">
          <label htmlFor="comment">Comment</label>
          <textarea name="comment" ref={commentRef}></textarea>
        </div>
        <button
          onClick={saveComment}
          className="btn btn--success comments__new-comment__submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
