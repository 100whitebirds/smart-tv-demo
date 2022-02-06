import React, { useEffect, useState } from 'react'
import s from './PhoneInput.module.scss'
import {
  useCompositeState,
  Composite,
  CompositeGroup,
  CompositeItem,
} from "reakit/Composite"
import resultBanner from '../../assets/resultBanner.jpeg'

function Grid(props: any) {
  return <Composite role="grid" {...props} />
}

function GridRow(props: any) {
  return <CompositeGroup role="row" {...props} />
}

function GridCell(props: any) {
  return <CompositeItem as="div" role="gridcell" {...props} />
}

type PhoneInputProps = {
  visible: boolean
}

const PhoneInput = ({ visible }: PhoneInputProps) => {
  const [phoneInputOpened, setPhoneInputOpened] = useState(visible)
  const [inputDigits, setInputDigits] = useState('')
  const [incorrectPhoneError, setIncorrectPhoneError] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const composite = useCompositeState({ wrap: true })

  useEffect(() => {
    var keyboardInput = ''
    const reg = new RegExp('^[0-9]$')
    document.addEventListener('keydown', (e) => {  
      if (e.key === 'Backspace') {
        keyboardInput = keyboardInput.slice(0, -1)
        setInputDigits(keyboardInput)
      } 
      if (reg.test(e.key) && keyboardInput.length < 10){
        keyboardInput += e.key
        setInputDigits(keyboardInput)
      } 
    })
  }, [phoneInputOpened])

  useEffect(() => {
    setPhoneInputOpened(visible)
    return () => {
      setInputDigits('')
      setConsentChecked(false)
      setFormSubmitted(false)
    }
  }, [visible])

  const handleClick = (e: any) => {
    e.preventDefault()
    if (e.target.id === '-1') {
      setInputDigits(inputDigits.slice(0, -1))
      setIncorrectPhoneError(false)
    } else if (inputDigits.length < 10) {
      setInputDigits(inputDigits + e.target.id)
      setIncorrectPhoneError(false)
    }
  }

  const handleSumbit = () => {
    if (inputDigits.length < 10) {
      setIncorrectPhoneError(true)
    } else {
      setFormSubmitted(true)
    } 
  }

  const handleCheckbox = () => {
    setConsentChecked(!consentChecked)
  }

  return (
    <div>
      { phoneInputOpened && !formSubmitted &&
        <div className={s.phoneInputContainer}>
          <div className={s.inputBlock}>
            <div className={s.inputTag}>
              Введите ваш номер мобильного телефона
            </div>
            <div className={incorrectPhoneError ? s.telNumberOnError : s.telNumber}>
              +7(
                  {inputDigits[0] || '_'}
                  {inputDigits[1] || '_'}
                  {inputDigits[2] || '_'}
                )
                  {inputDigits[3] || '_'}
                  {inputDigits[4] || '_'}
                  {inputDigits[5] || '_'}
                -
                  {inputDigits[6] || '_'}
                  {inputDigits[7] || '_'}
                -
                  {inputDigits[8] || '_'}
                  {inputDigits[9] || '_'}
            </div>
            <h2>
              и с Вами свяжется наш менеждер для дальнейшей консультации
            </h2>
          </div>
          <Grid className={s.numpad} {...composite} aria-label="My grid">
            <GridRow className={s.row} {...composite}>
              <GridCell className={s.digitButton} id='1' onClick={handleClick} {...composite}>1</GridCell>
              <GridCell className={s.digitButton} id='2' onClick={handleClick} {...composite}>2</GridCell>
              <GridCell className={s.digitButton} id='3' onClick={handleClick} {...composite}>3</GridCell>
            </GridRow>
            <GridRow className={s.row} {...composite}>
              <GridCell className={s.digitButton} id='4' onClick={handleClick}  {...composite}>4</GridCell>
              <GridCell className={s.digitButton} id='5' onClick={handleClick}  {...composite}>5</GridCell>
              <GridCell className={s.digitButton} id='6' onClick={handleClick}  {...composite}>6</GridCell>
            </GridRow>
            <GridRow className={s.row} {...composite}>
              <GridCell className={s.digitButton} id='7' onClick={handleClick}  {...composite}>7</GridCell>
              <GridCell className={s.digitButton} id='8' onClick={handleClick}  {...composite}>8</GridCell>
              <GridCell className={s.digitButton} id='9' onClick={handleClick}  {...composite}>9</GridCell>
            </GridRow>
            <GridRow className={s.row} {...composite}>
              <GridCell className={s.clearInputButton} id='-1' onClick={handleClick}  {...composite}>СТЕРЕТЬ</GridCell>
              <GridCell className={s.digitButton} id='0' onClick={handleClick}  {...composite}>0</GridCell>
            </GridRow>
          </Grid>
          {
            incorrectPhoneError ?
              <h2 className={s.inputError}>Неверно введён номер</h2>
              :
              <div className={s.consentForPersonalData}>
                <label htmlFor="checkbox-1">
                  <input onChange={handleCheckbox}type="checkbox" id="checkbox-1" />
                  <div className={s.checkBox}></div>
                </label>
                <h2>Согласие на обработку персональных данных</h2>
              </div>
          }
          <button 
            disabled={!(consentChecked && inputDigits.length === 10)}
            className={(consentChecked && inputDigits.length === 10) ? s.submitButtonEnabled : s.submitButton}
            onClick={handleSumbit}
          >
            ПОДТВЕРДИТЬ НОМЕР
          </button>
        </div>
      } 
      {phoneInputOpened && formSubmitted &&
        <div className={s.resultBanner}>
          <img src={resultBanner} alt="resultBanner" />
        </div>
      }
    </div>
  )
}

export default PhoneInput
