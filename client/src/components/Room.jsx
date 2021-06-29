import axios from 'axios';
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import useInput from '../hooks/useInput'
import Message from './Message';
import { io } from 'socket.io-client';

const Room = () => {
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const { user } = useContext(AuthContext);
    const message = useInput();
    const socket = useRef();
    const scrollRef = useRef();



    useEffect(() => {
        socket.current = io('ws://localhost:8080')
        // подключаемся к сокет серверу
        socket.current.emit("addUser", user._id, roomId);
        // добавляем пользователя в комнату
        socket.current.on('room', (data) => {
            console.log(`user with id ${data} connected`)
        })
        // слушаем событие подключения к комнате
        socket.current.on('getMessage', (msg) => {
            user._id !== msg.author._id && setMessages(prev => [...prev, msg])
        })
        //слушаем событие получения нового сообщения для всех участников комнаты, кроме отправителя
    }, [user])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/rooms/get-messages/${roomId}`)
                setMessages(data)
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
        getMessages()
        // при первом рендере загружаем все сообщения из базы данных
    }, [roomId])

    /**
     * Добавление нового сообщения.
     */
    const addMessage = async () => {
        if (!message.value) return
        // нельзя отправить пустое сообщение
        try {
            const { data } = await axios.post('http://localhost:5000/rooms/add-message/', {
                authorId: user._id,
                text: message.value,
                roomId: roomId
            })
            // отправляем запрос на добавление нового сообщения в базу данных, полученный ответ является успешно добавленным сообщением
            setMessages(prev => [...prev, { ...data, author: user }])
            // добавляем новое сообщение для пользователя, который отправил сообщение
            socket.current.emit('newMessage', { ...data, author: user })
            // вызываем событие getMessage у всех участников комнаты
            message.onChange({ target: { value: '' } })
            // обнуляем поле ввода
        }
        catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
        // при обновлении сообщений, опускаемся в конец чата
    }, [messages])


    return (
        <div className='container'>
            <div className='room'>
                <h1>Messages in room {roomId}</h1>
                <div className='room__messages'>
                    {messages.map(m =>
                        <div key={m._id} ref={scrollRef}>
                            <Message
                                text={m.text}
                                author={m.author.username}
                                own={m.author._id === user._id}
                            />
                        </div>
                    )}
                </div>
                <div className='room__bottom'>
                    <textarea onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            e.preventDefault()
                            addMessage()
                        }
                    }} {...message} cols="30" rows="10" />
                    <button onClick={addMessage}>
                        SEND
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Room
