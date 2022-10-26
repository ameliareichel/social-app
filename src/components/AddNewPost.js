import './AddNewPost.css';
import axios from 'axios';
import { useState } from 'react';

const AddNewPost = (props) => {

    const [postContent, setPostContent] = useState('');

    const postNewPost = (event) => {
        event.preventDefault();

        if (postContent === '') {
            return;
        }
        else {
            axios.post('https://akademia108.pl/api/social-app/post/add', { content: postContent })
                .then(() => {
                    props.addPost();
                    setPostContent('');
                })
                .catch(error => console.error(error))
        }
    };

    return (
        <form className='new-post' onSubmit={postNewPost}>
            <label>Add new post!</label><br />
            <textarea placeholder='Enter text...' onChange={(e) => setPostContent(e.target.value)} value={postContent}></textarea>
            <button type='submit' className='button-add'>Add</button>
        </form>
    );
};

export default AddNewPost;