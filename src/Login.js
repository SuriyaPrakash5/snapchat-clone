import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/appSlice'
import { auth, provider } from './firebase'
import "./Login.css"

function Login() {
    const dispatch = useDispatch()

    const signIn = () => {
        signInWithPopup(auth, provider).then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        }).catch(error => alert(error.message))
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src="https://upload.wikimedia.org/wikipedia/zh/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png" alt="" />
                <Button variant='outlined' onClick={signIn}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login
