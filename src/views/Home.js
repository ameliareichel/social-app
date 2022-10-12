import './PageTitle.css';
import './Home.css';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const getLastPosts = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest')
            .then(res => {
                setPosts(res.data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getLastPosts();
    }, []);

    console.log(posts);

    return (
        <div className='home'>
            <div className='posts-list'>
                {posts.map(post => {
                    return (
                        <Post post={post} key={post.id} />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;