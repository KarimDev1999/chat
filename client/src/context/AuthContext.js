import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const AuthContext = React.createContext();

/**
 * @param {object} props - Props object
 * @param {object} children - Вложенные компоненты
 */
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token')
            try {
                const { data } = await axios.get('http://localhost:5000/users/current-user', { headers: { "Authorization": `Bearer ${token}` } });
                setUser(data);
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
                console.log(err.response.data)
            }
        }
        checkToken()
    }, []);


    if (loading) {
        return <div>...loading</div>
    }


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


