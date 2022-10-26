import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = (props) => {

    const [likeCount, setLikeCount] = useState(props.post.likes.length);

    const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);

    const [loginMessageVisibility, setLoginMessageVisibility] = useState(false);

    const [ifUserLiked, setIfUserLiked] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);

    const deletePost = (id) => {

        axios.post('https://akademia108.pl/api/social-app/post/delete', {
            post_id: id,
        })
            .then((res) => {
                props.setPosts(posts => {
                    return posts.filter((post) => post.id !== res.data.post_id);
                });
            })
            .catch(error => { console.error(error) });
    };

    const like = (id, isLiked) => {
        axios.post('https://akademia108.pl/api/social-app/post/' + (isLiked ? 'dislike' : 'like'), { post_id: id })
            .then(() => {
                setLikeCount(likeCount + (isLiked ? -1 : 1));
                setIfUserLiked(!isLiked);
            });
    };

    return (
        <div className='post'>
            <div className='post-info'>
                <div className='user-info'>
                    <div className='user-avatar'>
                        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
                    </div>
                    <div className='user-name'>
                        <h3>{props.post.user.username}</h3>
                    </div>
                </div>
                <div className='post-date'>
                    <p className='date'>{props.post.created_at.substring(0, 10)}</p>
                </div>
            </div>
            <div className='post-content'>
                <p className='content'>{props.post.content}</p>
            </div>
            <div className='post-like-count'>
                <p className='like-count'>
                    <span className={ifUserLiked && props.user ? 'like-symbol' : 'like-symbol-liked'} onClick={() => {
                        if (props.user) {
                            like(props.post.id, ifUserLiked);
                        }
                        else if (!props.user) {
                            setLoginMessageVisibility(true);
                        };
                    }}>&#9825;</span> {likeCount}
                    {props.user?.username === props.post.user.username && <span className='delete-symbol' onClick={() => setDeleteMessageVisibility(true)}>🗑️</span>}
                </p>
            </div>

            {deleteMessageVisibility && <div className='delete-confirm'>
                <h2>Do you really want to delete this post?</h2>
                <button className='confirm-button' onClick={() => deletePost(props.post.id)}>Yes</button>
                <button className='confirm-button' onClick={() => setDeleteMessageVisibility(false)}>No</button>
            </div>}

            {loginMessageVisibility && <div className='log-to-like'>
                <h2>Log in to be able to like posts!</h2>
                <button className='confirm-button'><Link className='link-to-log' to='/login'>Log In</Link></button>
                <button className='confirm-button' onClick={() => setLoginMessageVisibility(false)}>Cancel</button>
            </div>}
        </div>
    );
};

export default Post;