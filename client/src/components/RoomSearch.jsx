import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import useInput from '../hooks/useInput'

const RoomSearch = () => {
    const roomField = useInput('')
    const { user } = useContext(AuthContext);
    const histoty = useHistory();

    const createRoom = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/rooms/create', user)
            if (data) {
                return histoty.push(`/room/${data._id}`)
            }
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    const joinRoom = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/rooms/get-room/${roomField.value}`)
            return histoty.push(`room/${data}`)
        }
        catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className='container'>
            <h1> Room search</h1>
            <div className='room-search'>
                <div className="room-search-left">
                    <input {...roomField} placeholder='search room' type="text" />
                    <button onClick={joinRoom} className='room-search__button'>Join</button>
                </div>
                <div className="room-search-right">
                    <button onClick={createRoom} className='room-search__button'>Create room</button>
                </div>
            </div>
        </div>

    )
}

export default RoomSearch
