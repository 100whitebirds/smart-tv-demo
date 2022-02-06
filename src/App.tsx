import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import './App.css'
import volvoTrucks from './assets/volvoTrucks.mp4'
import firstBanner from './assets/firstBanner.png'
import qrCode from './assets/qrCode.png'
import PhoneInput from './components/PhoneInput/PhoneInput'
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite"


function App() {
  const [firstBannerVisible, setFirstBannerVisible] = useState(true)
  const [phoneInputVisible, setPhoneInputVisible] = useState(false)
  const vidRef = useRef() as MutableRefObject<HTMLVideoElement>
  const composite = useCompositeState()

  const handlePlayVideo = () => {
    vidRef.current.paused ? vidRef.current.play() : vidRef.current.pause()
  }

  const openPhoneInput = () => {
    setPhoneInputVisible(true)
    setFirstBannerVisible(false)
    handlePlayVideo()
  }

  const closePhoneInput = () => {
    setPhoneInputVisible(false)
    setFirstBannerVisible(true)
    handlePlayVideo()
  }
  
  return (
    <div className='appContainer'>
      <video ref={vidRef} autoPlay loop className='video'>
        <source src ={volvoTrucks} type='video/mp4' />
      </video>
      { firstBannerVisible && 
        <div className='firstBanner'>
          <img className='firstBannerImg' src={firstBanner} alt='banner' />
          <Composite {...composite} role="toolbar" aria-label="My toolbar">
            <CompositeItem className='okButton' {...composite} onClick={openPhoneInput}></CompositeItem>
          </Composite>
        </div>
      }
      <PhoneInput visible={phoneInputVisible}/>
      { phoneInputVisible && 
        <>
          <button className='closeButton' onClick={closePhoneInput}>Х</button>
          <div className="qrCodeBlock">
              <h3>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</h3>
              <img className='qrCode' src={qrCode} alt="qrCode"/>
          </div>
        </>
      }
    </div>
  )
}

export default App
