import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useInput from '../hooks/useInput';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const email = useInput('');
    const password = useInput('');
    const username = useInput('');
    const history = useHistory();
    const { setUser } = useContext(AuthContext)


    const register = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/auth/register', { email: email.value, password: password.value, username: username.value })
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
            <h1>Register</h1>
            <form onSubmit={register} >

                <label>Username</label>
                <input {...username} type="text" placeholder='Username' />

                <label>Email</label>
                <input {...email} type="text" placeholder='Email' />

                <label>Password</label>
                <input {...password} type="text" placeholder='Password' />
                <input type="submit" value='Register' />
            </form>
            <div>
                Already have an account? <Link to='/login'>Sign in</Link>
            </div>
        </div>
    )
}

export default Register
