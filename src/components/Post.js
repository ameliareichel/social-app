import axios from 'axios';
import { useState } from 'react';
import './Post.css';

const Post = (props) => {

    const [likeCount, setLikeCount] = useState(props.post.likes.length);

    const [deleteMessageVisibility, setDeleteMessageVisibility] = useState(false);

    const deletePost = (id) => {

        axios.post('https://akademia108.pl/api/social-app/post/delete', {
            post_id: id,
        })
            .then((response) => {
                props.setPosts((posts) => {
                    
                })
            })
            .catch(error => { console.error(error) });
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
                <p className='like-count'><span className='like-symbol'>&#9825;</span> {likeCount}
                    {props.user?.username === props.post.user.username && <span className='delete-symbol' onClick={() => setDeleteMessageVisibility(true)}>🗑️</span>}</p>
            </div>

            {deleteMessageVisibility && <div className='delete-confirm'>
                <h2>Do you really want to delete this post?</h2>
                <button className='confirm-button' onClick={() => deletePost(props.post.id)}>Yes</button>
                <button className='confirm-button' onClick={() => setDeleteMessageVisibility(false)}>No</button>
            </div>}
        </div>
    );
};

export default Post;