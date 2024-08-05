import React, { useCallback, useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./ChatView.css"
import { selectSelectedImage } from './features/appSlice'

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage)
    const navigate = useNavigate()

    const exit = useCallback(() => {
        navigate("/chats")

    }, [navigate])

    useEffect(() => {
        if (!selectedImage) {
            exit()
        }
    }, [selectedImage, exit])



    return (
        <div className='chatView'>
            <img src={selectedImage} onClick={exit} alt="" />
            <div className="chatView__timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors="#EF798A"
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit()
                        }
                        return remainingTime
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
