import React, { useEffect, useState, useRef } from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { getArticleById, getImage, insertArticle, updateArticle, uploadImage } from '../../services/article-services'
import imgDefault from '../../../images/default.jpg';
import './article-create-view.scss';

const ArticleCreateView = (params) => {

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const [status, setStatus] = useState("waiting");
	const [selectedFile, setSelectedFile] = useState(null);

	const titleRef = useRef();
	const contentRef = useRef();
	const validator = useRef(new SimpleReactValidator());

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
		if (params.match.params.id) {
			getArticle();
		}
	}, []);

	const saveArticle = (event) => {
		event.preventDefault();

		if (validator.current.allValid()) {

			validator.current.hideMessages();

			if (params.match.params.id) {
				updateArticle(articleData);
			} else {
				insertArticle(articleData)
					.then(resArticle => {
						setArticleData(resArticle);
						setStatus("waiting");

						if (selectedFile !== null) {

							console.log(articleData);
							console.log(resArticle);

							const articleId = articleData._id;
							const formData = new FormData();
							formData.append('file0', selectedFile, selectedFile.name);
							uploadImage(articleId, formData)
								.then(resArticle => {
									setArticleData(resArticle);
									setStatus("success");
								})
								.catch(resError => {
									setStatus("failed");
									swal(
										'Something gone wrong',
										'There was an error and the image was not saved correctly',
										'error'
									);
								});

						} else {
							setStatus("success");
						}
					})
					.catch(resError => {
						setStatus("failed");
						setError(resError);

						swal(
							'Something gone wrong',
							'There was an error and the entry was not saved correctly',
							'error'
						);
					});
			}

		}
	}

	const fileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	}

	const changeState = (event) => {
		setArticleData({
			title: titleRef.current.value,
			content: contentRef.current.value,
			image: null
		});
	}


	return (
		<>
			<Slider title="New Article" size="small" />
			<div className="content">
				<div className="content__body">
					<form className="mid-form article-create" onSubmit={saveArticle} onChange={changeState}>

						<div className="mid-form__form-group">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" defaultValue={articleData.title} ref={titleRef} />
							{validator.current.message('title', articleData.title, 'required|alpha_num_space')}
						</div>

						<div className="mid-form__form-group">
							<label htmlFor="content">Content</label>
							<textarea name="content" defaultValue={articleData.content}  ref={contentRef} ></textarea>
							{validator.current.message('content', articleData.content, 'required')}
						</div>

						<div className="mid-form__form-group">
							<div className="article-create__image">
								<label htmlFor="file0">Imagen</label>
								{articleData.image &&
									<img src={getImage(articleData.image)} alt={articleData.title} />
								}
							</div>
							<input type="file" name="file0" onChange={fileChange} />
						</div>

						<input type="submit" value="Guardar" className="btn btn-success" />
					</form>
				</div>
				<Sidebar inArticle="true" />
			</div>
		</>
	);
}

export default ArticleCreateView;