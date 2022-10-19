import './AddNewPost.css';
import axios from 'axios';

const AddNewPost = (props) => {

    return (
        <form className='new-post'>
            <label>Add new post!</label><br />
            <textarea placeholder='Enter text...'></textarea>
            <button className='button-add'>Add</button>
        </form>
    );
};

export default AddNewPost;