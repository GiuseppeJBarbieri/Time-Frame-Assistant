import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


const LoginForm = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        console.log({ token });
        history.replace('/dashboard');
    }

    return (
        <div className='text-white bg-dark' style={{ 'padding': 150 }}>
            <div className='container border border-white rounded' style={{ 'maxWidth': 750, 'textAlign': 'center', 'borderWidth': 5, 'borderColor': 'white', 'padding': 50 }}>
                <h1 style={{ 'marginBottom': 20 }}>Time Frame Assistant</h1>
                <h2 style={{ 'marginBottom': 25 }}>Sign In</h2>

                <form className='container' onSubmit={handleSubmit} style={{ 'maxWidth': 350 }}>

                    <input type='text' className="form-control" placeholder="Enter email" style={{ 'marginBottom': 15, 'textAlign': 'center' }} onChange={e => setUserName(e.target.value)} />
                    <input type='password' className="form-control" placeholder="Password" style={{ 'marginBottom': 15, 'textAlign': 'center' }} onChange={e => setPassword(e.target.value)} />

                    <hr style={{ 'maxWidth': '80%', 'margin': 'auto', 'marginBottom': 15 }} />

                    <button type='submit' className='btn btn-primary form-control' style={{ 'marginBottom': 5 }}>Login</button>

                </form>
            </div>
        </div>
    )
}
LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default LoginForm
