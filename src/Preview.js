import { AttachFile, Close, Create, Group, MusicNote, Note, Send, TextFields, Timer } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import "./Preview.css"
import { db, storage } from "./firebase"

import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { selectUser } from './features/appSlice'

function Preview() {
    const navigate = useNavigate()

    const cameraImage = useSelector(selectCameraImage)

    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    useEffect(() => {
        if (!cameraImage) {
            navigate("/")
        }
    }, [navigate, cameraImage])

    const closePreview = () => {
        dispatch(resetCameraImage())
    }

    const sendPost = () => {
        const id = uuid();
        const storageRef = ref(storage, `posts/${id}`)
        const uploadTask = uploadString(storageRef, cameraImage, "data_url")
        //complete function
        uploadTask.then((snapshot) => {
            getDownloadURL(storageRef).then((url) => {
                addDoc(collection(db, "posts"), {
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: serverTimestamp()
                })
                navigate("/chats")
            })
        }
        )
    }

    return (
        <div className="preview">
            <Close
                className="preview__close"
                onClick={closePreview}
            />
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Group />
                <Timer />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <Send
                    fontSize='small'
                    className='preview__sendIcon'
                />
            </div>
        </div>
    )
}

export default Preview
