import React, {Component} from 'react'
import axios from '../../axios'
import Post from '../../components/Post/Post'
import './Posts.css'
import {Route} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    
    state = {
        posts: []
    } 
    
    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                 console.log(error);
                //this.setState({error: true});
            });
    }
    
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
        // Alternative to using Link in return statement
        // It pushs the new page onto the existing stack of pages
        this.props.history.push({pathname: '/' + id})
    }

    render() {       
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return ( 
                    // Alternative to using Link is using history.push written in postSelectedHandler
                    // <Link to={'/' + post.id} key={post.id}> 
                        <Post 
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}                                 
                            key={post.id}
                        />
                    // </Link> 
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts} 
                </section>
                {/* starting with ':' are parameters in path */}
                <Route path="/:id" exact component={FullPost} />
            </div>
        )
    }
}

export default Posts