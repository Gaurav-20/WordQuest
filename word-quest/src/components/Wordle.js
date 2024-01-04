import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'

export default function Wordle({ solution }) {
  
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn }  = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

  useEffect(() => {
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect])

  return (
    <div>
      <div>Current guess = { currentGuess }</div>
      <div>Solution = { solution }</div> {/* for dev reference only */}
      <Grid currentGuess = { currentGuess } guesses = { guesses } turn = { turn }></Grid>
    </div>
  )
}
