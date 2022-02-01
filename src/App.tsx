import React, { MutableRefObject, useRef } from 'react'
import './App.css'
import VolvoTrucks from './assets/VolvoTrucks.mp4'


function App() {
  const vidRef = useRef() as MutableRefObject<HTMLVideoElement>
  const handlePlayVideo = () => {
    vidRef.current.paused ? vidRef.current.play() : vidRef.current.pause()
  }

  return (
    <div className='app-container' onClick={handlePlayVideo}>
      <video ref={vidRef} autoPlay loop muted className="video">
        <source src ={VolvoTrucks} type='video/mp4' />
      </video>
    </div>
  )
}

export default App
