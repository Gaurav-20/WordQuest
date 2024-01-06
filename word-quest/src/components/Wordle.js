import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import { MAX_GUESSES } from '../constants'

export default function Wordle({ solution }) {
  
  const { currentGuess, handleKeyUp, guesses, isCorrect, usedKeys, turn }  = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    if (isCorrect) {
      console.log(`You found the word correctly in ${turn} attempts!`)
      window.removeEventListener('keyup', handleKeyUp)
    }
    if (turn >= MAX_GUESSES) {
      console.log(`You are out of attempts.. The word was ${solution}!`)
      window.removeEventListener('keyup', handleKeyUp)
    }
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])

  return (
    <div>
      <div>Current guess = { currentGuess }</div>
      <div>Solution = { solution }</div> {/* for dev reference only */}
      <Grid currentGuess = { currentGuess } guesses = { guesses } turn = { turn } />
      <Keypad usedKeys = { usedKeys } />
    </div>
  )
}
