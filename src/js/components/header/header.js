import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
	return (
		<header className="blog-header">
				<div className="blog-header__logo">
					<span className="blog-header__logo__title"> Blog React </span>
				</div>

				<nav className="blog-header__menu">
					<ul>
						<li className="blog-header__menu__item">
							<NavLink to="/home" activeClassName="blog-header__menu__item--active" >Home</NavLink>
						</li>
						<li className="blog-header__menu__item">
							<NavLink to="/blog" activeClassName="blog-header__menu__item--active">Blog</NavLink>
						</li>
						<li className="blog-header__menu__item">
							<NavLink to="/contact" activeClassName="blog-header__menu__item--active">Contact</NavLink>
						</li>
					</ul>
				</nav>

				<div className="clearfix"></div>
		</header>
	);
}

export default Header;