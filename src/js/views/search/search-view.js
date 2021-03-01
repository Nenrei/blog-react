import React from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'
import Articles from '../../components/articles/articles'

const SearchView = (params) => {
	return (
		<>
			<Slider title={`Found entries with "${params.match.params.searchText}"`} size="small" />
			<div className="content">
				<div className="content__body">
					<Articles searchText={params.match.params.searchText} />
				</div>
				<Sidebar blog="true" />
			</div>
		</>
	);
}

export default SearchView;