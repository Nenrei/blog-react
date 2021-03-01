import React from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'

const ErrorView = () => {
    return (
        <>
            <Slider title="Page not found" size="small" />
            <div className="content">
                <div className="content__body">
                    <h2 className="subheader"> The page you are trying to access does not exist </h2>
                </div>
                <Sidebar blog="false" />
            </div>
        </>
    );
}

export default ErrorView;