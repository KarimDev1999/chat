import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';



const Login = () => {
    const email = useInput('');
    const password = useInput('');
    const history = useHistory();
    const { setUser } = useContext(AuthContext)


    const login = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/auth/login', { email: email.value, password: password.value })
            if (data) {
                localStorage.setItem('access_token', data.access_token)
                setUser(data.user)
                history.push('/room-search')
            }
        }
        catch (err) {
            alert(err.response.data)
        }
    }

    return (
        <div className='form container'>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label>Email</label>
                <input {...email} type="text" placeholder='Email' />
                <label>Password</label>
                <input {...password} type="text" placeholder='Password' />

                <input type="submit" value='Login' />
            </form>
            <div>
                Don`t have an account? <Link to='/register'>Sign up</Link>
            </div>
        </div>
    )
}

export default Login
