import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import { MAX_GUESSES } from '../constants'

export default function Wordle({ solution }) {
  
  const { currentGuess, handleKeyUp, guesses, isCorrect, usedKeys, turn }  = useWordle(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyUp)
    }
    if (turn >= MAX_GUESSES) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyUp)
    }
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])

  return (
    <div>
      <Grid currentGuess = { currentGuess } guesses = { guesses } turn = { turn } />
      <Keypad usedKeys = { usedKeys } />
      {showModal && <Modal isCorrect = { isCorrect } turn = { turn } solution = { solution } />}
    </div>
  )
}
