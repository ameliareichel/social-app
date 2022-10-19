import './PageTitle.css';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = (props) => {

    const [formInfo, setFormInfo] = useState({
        username: '',
        password: ''
    });

    const [messageLogin, setMessageLogin] = useState('');

    const inputChangeFunction = (event) => {
        const target = event.target;
        const name = target.name;

        setFormInfo({
            ...formInfo,
            [name]: target.value
        })
    };

    const submitForm = (event) => {
        event.preventDefault();

        axios.post('https://akademia108.pl/api/social-app/user/login', {
            username: formInfo.username,
            password: formInfo.password
        })
            .then(res => {

                if (Array.isArray(res.data.username)) {
                    setMessageLogin(res.data.username[0]);
                }
                else if (Array.isArray(res.data.password)) {
                    setMessageLogin(res.data.password[0]);
                }
                else if (res.data.error) {
                    setMessageLogin('Incorrect user login info');
                }
                else {
                    setMessageLogin('');
                    props.setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                };
            })
            .catch(error => console.error(error));
    };

    return (
        <div className='form-login'>
            <h2>Log in</h2>
            {props.user && <Navigate to="/" />}
            <form className='login-form' onSubmit={submitForm}>
                {messageLogin && <h2>{messageLogin}</h2>}
                <label htmlFor="username">Username</label><br />
                <input type="text" name='username' value={formInfo.username} onChange={inputChangeFunction} /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name='password' value={formInfo.password} onChange={inputChangeFunction} /><br />
                <input type="submit" value="Log in" />
            </form>
        </div>
    );
};

export default Login;