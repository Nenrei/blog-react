import axios from "axios";

const API_URL = "http://localhost:3900/api";

export const getCommentsByArticle = (articleId) => {
  const apiUrl = `${API_URL}/getCommentsByArticle/${articleId}`;
  return axios.get(apiUrl).then((res) => res.data.comments);
};

export const insertComment = (comment) => {
  const apiUrl = `${API_URL}/saveComment`;
  return axios.post(apiUrl, comment).then((res) => res.data.comment);
};