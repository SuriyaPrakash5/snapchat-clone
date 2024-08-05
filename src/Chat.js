import { StopRounded } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactTimeago from 'react-timeago'
import "./Chat.css"
import { selectImage } from './features/appSlice'
import { db } from './firebase'
function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl))

            setDoc(doc(db, "posts", id), {
                read: true
            }, { merge: true })

            navigate("/chats/view")
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar
                className='chat__avatar'
                src={profilePic}
            />
            <div className='chat__info'>
                <h4>{username}</h4>
                <p>{!read && "Tap to view - "}<ReactTimeago
                    date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>
            {!read && <StopRounded
                className='chat__readIcon'
            />}
        </div>
    )
}

export default Chat
