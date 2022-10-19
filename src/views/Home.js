import './PageTitle.css';
import './Home.css';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import axios from 'axios';
import AddNewPost from '../components/AddNewPost';

const Home = (props) => {
    const [posts, setPosts] = useState([]);

    const getLastPosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest')
            .then(res => {
                setPosts(res.data);
            })
            .catch(error => console.error(error));
    };

    const getMorePosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/older-then', {
            date: posts[posts.length - 1].created_at
        })
            .then(res => {
                setPosts(posts.concat(res.data));
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getLastPosts();
    }, [props.user]);


    return (
        <div className='home'>
            {props.user && <AddNewPost />}
            <div className='posts-list'>
                {posts.map(post => {
                    return (
                        <Post post={post} key={post.id} />
                    );
                })}
            </div>
            <button className='more-posts' type='submit' onClick={getMorePosts} >Load More...</button>
        </div>
    );
};

export default Home;