import React from "react";
import Moment from "react-moment";
import "./comment.scss";

const Comment = (props) => {

  const commentData = props.commentData;

  return (
    <article className="comment" key={commentData._id}>
      <div className="comment__user">{commentData.userName}</div>
      <div className="comment__date">
        <Moment format="YYYY-MM-DD HH:mm">{commentData.date}</Moment>
      </div>
      <div className="comment__comment">{commentData.comment}</div>
    </article>
  );
};

export default Comment;
