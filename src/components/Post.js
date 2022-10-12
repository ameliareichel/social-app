import { useState } from 'react';
import './Post.css';

const Post = (props) => {

    const [likeCount, setLikeCount] = useState(props.post.likes.length);

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
                <p className='like-count'><span className='like-symbol'>&#9825;</span> {likeCount}</p>
            </div>
        </div>
    );
};

export default Post;