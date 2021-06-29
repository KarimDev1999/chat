import React from 'react'
import classnames from 'classnames'

/**
 * @param {object} props - Props object
 * @param {boolean} own - Является ли пользователь автором сообщения
 * @param {string} text - Текст сообщения
 * @param {string} author - Имя автора сообщения
 */
const Message = ({ own, text, author }) => {
    return (
        <div className={classnames('room__message', { 'own': own })}>
            <div className='room__message-author'>
                {author}
            </div>
            <div className='room__message-text'>
                {text}
            </div>
        </div>
    )
}

export default Message
