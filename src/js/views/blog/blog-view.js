import React from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'
import Articles from '../../components/articles/articles'

const BlogView = () => {
	return (
		<>
			<Slider title="Blog" size="small" />
			<div className="content">
				<div className="content__body">
					<Articles/>
				</div>
				<Sidebar blog="true" />
			</div>
		</>
	);
}

export default BlogView;