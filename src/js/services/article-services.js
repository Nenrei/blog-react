import axios from "axios";

const API_URL = "http://localhost:3900/api";

export const getArticles = () => {
  const apiUrl = `${API_URL}/articles`;
  return axios.get(apiUrl).then((articles) => articles.data);
};

export const getLastArticles = () => {
  const apiUrl = `${API_URL}/articles/last`;
  return axios.get(apiUrl).then((articles) => articles.data);
};

export const getArticlesBySearch = (searchText) => {
  const apiUrl = `${API_URL}/search/${searchText}`;
  return axios.get(apiUrl).then((articles) => articles.data);
};

export const getArticleById = (articleId) => {
  const apiUrl = `${API_URL}/article/${articleId}`;
  return axios.get(apiUrl).then((res) => res.data.article);
};

export const removeArticle = (articleId) => {
  const apiUrl = `${API_URL}/removeArticle/${articleId}`;
  return axios.delete(apiUrl).then((res) => res.data.article);
};

export const insertArticle = (article) => {
  const apiUrl = `${API_URL}/saveArticle`;
  return axios.post(apiUrl, article).then((res) => res.data.article);
};

export const updateArticle = (article) => {
  const apiUrl = `${API_URL}/updateArticle/${article._id}`;
  return axios.put(apiUrl, article).then((res) => res.data.article);
};

export const uploadImage = (articleId, formData) => {
  const apiUrl = `${API_URL}/upload-image/${articleId}`;
  console.log(apiUrl);
  return axios.post(apiUrl, formData).then((res) => res.data.article);
};

export const getImage = (image) => {
  return `${API_URL}/get-image/${image}`;
};
