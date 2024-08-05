import { ChatBubble, RadioButtonChecked, RadioButtonUnchecked, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { signOut } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chat from './Chat'
import "./Chats.css"
import { selectUser } from './features/appSlice'
import { resetCameraImage } from './features/cameraSlice'
import { auth, db } from './firebase'

function Chats() {

    const [posts, setPosts] = useState([])
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
        onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage())
        navigate("/")
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar
                    src={user.profilePic}
                    onClick={() => signOut(auth)}
                    className="chats__avatar"
                />
                <div className="chats__search">
                    <Search className='chats__searchIcon' />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubble className="chats__chatIcon" />
            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}

            </div>

            <RadioButtonUnchecked
                className='chats__takePicIcon'
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chats
