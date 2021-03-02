import React from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'
import Articles from '../../components/articles/articles'

const HomeView = () => {
	return (
		<>
			<Slider title="Home" size="small" />
			<div className="content">
				<div className="content__body">
					<h2 className="subheader"> Last Articles</h2>
					<Articles home="true"/>
				</div>
				<Sidebar blog="false" />
			</div>
		</>
	);
}

export default HomeView;