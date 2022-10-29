import { useState } from 'react';
import './PageTitle.css';
import './Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [formInfo, setFormInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [issues, setIssues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [messageSignup, setMessageSignup] = useState('');

    const [signedUp, setSignedUp] = useState(false);

    const inputChangeFunction = (event) => {
        const target = event.target;
        const name = target.name;
        setFormInfo({
            ...formInfo,
            [name]: target.value
        });
    };


    const formValidation = () => {

        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        let validationIssues = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        };

        if (formInfo.username.trim().length < 4) {
            validationIssues.username = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    username: 'Username should have at least 4 characters!',
                };
            });
        }
        else if (!/^[^\s]*$/.test(formInfo.username.trim())) {
            validationIssues.username = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    username: 'Username should not have empty spaces!'
                };
            });
        }
        else {
            validationIssues.username = false;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    username: ""
                };
            });
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formInfo.email.trim())) {
            validationIssues.email = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    email: 'Incorrect email address form!',
                };
            });
        }
        else {
            validationIssues.email = false;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    email: ""
                };
            });
        };

        if (formInfo.password.trim().length < 6) {
            validationIssues.password = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    password: 'Password should have at least 6 characters!'
                };
            });
        }
        else if (!/^[^\s]*$/.test(formInfo.password.trim())) {
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    password: "Password shouldn't have empty spaces!"
                };
            });
        }
        else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formInfo.password.trim())) {
            validationIssues.password = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    password: "Password should have at least one special character: ! # @ $ %"
                };
            });
        }
        else if (!numbers.some(number => formInfo.password.trim().includes(number))) {
            validationIssues.password = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    password: 'Password should have at least one number!'
                };
            });
        }
        else {
            validationIssues.password = false;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    password: ''
                };
            });
        };

        if (formInfo.password.trim() !== formInfo.confirmPassword.trim()) {
            validationIssues.confirmPassword = true;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    confirmPassword: 'Confirm password field should be the same as password field!'
                };
            });
        }
        else {
            validationIssues.confirmPassword = false;
            setIssues(prevIssues => {
                return {
                    ...prevIssues,
                    confirmPassword: ''
                };
            });
        };

        return (!validationIssues.username && !validationIssues.email && !validationIssues.password && !validationIssues.confirmPassword);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (!formValidation()) {
            return;
        }

        axios.post('https://akademia108.pl/api/social-app/user/signup', {
            username: formInfo.username,
            email: formInfo.email,
            password: formInfo.password,
            confirmPassword: formInfo.confirmPassword
        })
            .then(res => {
                console.log(res.data);
                let response = res.data;

                if (response.signedup) {
                    setMessageSignup('You have been signed up successfully!');
                    setSignedUp(true);
                }
                else {
                    if (response.message.username) {
                        setMessageSignup(response.message.username[0]);
                    }
                    else if (response.message.email) {
                        setMessageSignup(response.message.email[0]);
                    };
                };
            })
            .catch(error => console.error(error));
    };

    return (
        <div className='form-signup'>
            <h2>Sign up</h2>
            <form className='signup-form' onSubmit={submitForm}>
                {messageSignup && <h2 className='signup-message'>{messageSignup}</h2>}
                {issues.username && <p className='signup-issues'>{issues.username}</p>}
                {issues.email && <p className='signup-issues'>{issues.email}</p>}
                {issues.password && <p className='signup-issues'>{issues.password}
                </p>}
                {issues.confirmPassword && <p className='signup-issues'>{issues.confirmPassword}</p>}
                <label htmlFor="username">Username</label><br />
                <input type="text" name="username" onChange={inputChangeFunction} /><br />
                <label htmlFor="email">Email</label><br />
                <input type="text" name="email" onChange={inputChangeFunction} /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" onChange={inputChangeFunction} /><br />
                <label htmlFor="password-repeat">Confirm Password</label><br />
                <input type="password" name="confirmPassword" onChange={inputChangeFunction} /><br />
                <button type="submit" className='signup-button' disabled={signedUp} >Sign Up</button><br />
                <button className='login-button'><Link className='redirect-to-log' to='/login'>Log In</Link></button>
            </form>
        </div>
    );
};

export default Signup;