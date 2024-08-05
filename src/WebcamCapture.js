import { RadioButtonUnchecked } from '@mui/icons-material'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { setCameraImage } from "./features/cameraSlice"
import "./WebcamCapture.css"

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
}

function WebcamCapture() {

    const webcamRef = useRef(null)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        dispatch(setCameraImage(imageSrc))
        navigate("/preview")
    }, [webcamRef, dispatch, navigate])

    return (
        <div className='webcamCapture'>

            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUnchecked
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />


        </div>
    )
}

export default WebcamCapture
