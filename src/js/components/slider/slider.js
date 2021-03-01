import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

import './slider.scss';

const Slider = (params) => {

	const sliderClass = ClassNames({
		slider: true,
		"slider--small": params.size && params.size === "small"
	});

	return(
		<div className={sliderClass}>
			<h1>{ params.title }</h1>
			{ params.btn && <Link to="/blog" className="btn btn--white">{ params.btn }</Link> }
		</div>
	);
}

export default Slider;