import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Posts/Posts'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import asyncComponent from '../../hoc/asyncComponent'

const asyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost')
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname:"/new-post",
                                hash: "#submit",
                                search: "?quick-submit=true"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>   
                {/* <Route path="/" exact render={() => <h1>Home 1</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                {/* By default router renders all matching paths but 'Switch' tells router to only render the first matching path */}
                <Switch>
                    {(this.state.auth) ? <Route path="/new-post" exact component={asyncNewPost} /> : null }
                    {/* order matters in routes => new-post is before /posts */}
                    <Route path="/posts" component={Posts} />
                    {/* catching any unknown routes */}
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* 'from' can only be used when 'redirect' is inside 'switch' */}
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;