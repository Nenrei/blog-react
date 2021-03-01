import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './js/components/header/header';
import ErrorView from './js/views/error/error-view';
import Home from './js/views/home/home-view';
import Blog from './js/views/blog/blog-view';
import Contact from './js/views/contact/contact-view';
import Footer from './js/components/footer/Footer';
import ArticleDetail from './js/views/article-detail/article-detail-view';
import ArticleCreate from './js/views/article-create/article-create-view';
import Search from './js/views/search/search-view';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/entry/:id" component={ArticleDetail} />
                    <Route exact path="/blog/create" component={ArticleCreate} />
                    <Route exact path="/blog/update/:id" component={ArticleCreate} />
                    <Route exact path="/blog/search/:searchText" component={Search} />

                    <Route exact path="/redirect/:searchText" render={
                        (props) => {
                            return(
                                <Redirect to={"/blog/search/" + props.match.params.searchText}/>
                            );
                        }
                    }/>

                    
                    <Route exact path="/contact" component={Contact} />
                    <Route component={ErrorView} />
                </Switch>

                <div className="clearfix"></div>

                <Footer />

            </BrowserRouter>
        );
    }
}

export default Router;