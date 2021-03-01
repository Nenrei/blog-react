import React, { useState, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaRegPlusSquare, FaRegSave } from 'react-icons/fa'

import './sidebar.scss';

const Sidebar = (params) => {

	const [search, setSearch] = useState("");
	const [redirect, setRedirect] = useState(false);


	const searchRef = useRef(search);

	const redirectToSearch = (e) => {
		e.preventDefault();
		setSearch(searchRef.current.value);
		setRedirect(true);
	}


	return (
		(redirect && search.length > 0) ?
			<Redirect to={'/redirect/' + search} />
			:
			<aside className="sidebar">
				{params.blog === "true" &&
					<div className="sidebar__item">
						<h3>Actions</h3>
						<Link to="/blog/create" className="btn btn--success btn--icon"> <FaRegPlusSquare /> </Link>
					</div>
				}
				{params.article === "true" && params.articleData != undefined && params.articleData._id && 
					<div className="sidebar__item">
						<h3>Actions</h3>
						<Link to="/blog/create" className="btn btn--success btn--icon"> <FaRegPlusSquare /> </Link>
						<Link to={"/blog/update/" + params.articleData._id} className="btn btn--warning btn--icon"> <FaEdit /> </Link>
						{params.deleteArticle &&
							<button onClick={ params.deleteArticle } className="btn btn--danger btn--icon"> <FaTrashAlt /> </button>
						}
					</div>
				}
				{params.inArticle === "true" &&
					<div className="sidebar__item">
						<h3>Actions</h3>
						{params.saveArticle && 
							<button onClick={ params.saveArticle } className="btn btn--success btn--icon"> <FaRegSave /> </button>
						}
						{params.deleteArticle &&
							<button onClick={ params.deleteArticle } className="btn btn--danger btn--icon"> <FaTrashAlt /> </button>
						}
					</div>
				}

				<div className="sidebar__item">
					<h3>Find an entry</h3>
					<form className="sidebar__item__form" onSubmit={redirectToSearch}>
						<input type="text" name="search" ref={searchRef} />
						<input type="submit" name="submit" className="btn" value="Search" />
					</form>
				</div>
			</aside>
	);


}

export default Sidebar;