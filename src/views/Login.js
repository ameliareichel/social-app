import './PageTitle.css';
import './Login.css';

const Login = () => {
    return (
        <div className='form-login'>
            <h2>Log in</h2>
            <form className='login-form'>
                <label htmlFor="username">Username</label><br />
                <input type="text" /><br />
                <label htmlFor="username">Password</label><br />
                <input type="text" /><br />
                <input type="submit" value="Log in" />
            </form>
        </div>
    );
};

export default Login;