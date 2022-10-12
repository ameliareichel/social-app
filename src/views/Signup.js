import './PageTitle.css';
import './Signup.css';

const Signup = () => {
    return (
        <div className='form-signup'>
            <h2>Sign up</h2>
            <form className='signup-form'>
                <label htmlFor="username">Username</label><br />
                <input type="text" /><br />
                <label htmlFor="email">Email</label><br />
                <input type="text" /><br />
                <label htmlFor="password">Password</label><br />
                <input type="text" /><br />
                <label htmlFor="password-repeat">Confirm Password</label><br />
                <input type="text" /><br />
                <input type="submit" value="Sign up" /><br />
                <input type="submit" value="Log in" />
            </form>
        </div>
    );
};

export default Signup;