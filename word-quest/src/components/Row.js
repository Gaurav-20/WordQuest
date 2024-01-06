import React from 'react'
import { GUESS_LENGTH } from '../constants'

export default function Row({ guess, currentGuess }) {

  if (guess) {
    return (
      <div className = 'row past'>
        {
          guess.map((letter, index) => (
            <div key = { index } className = { letter.color }>{ letter.key }</div>
          ))
        }
      </div>
    )
  }
  if (currentGuess) {
    let letters = currentGuess.split('')
    return (
      <div className = 'row current'>
        {
          letters.map((letter, index) => (
            <div key = { index } className = 'filled'>{ letter }</div>
          ))
        }
        {
          /*
            GUESS_LENGTH - letter.length won't ever be negative
            as we stop taking input if it is more than 5 letters
            so no need of taking max with 0
          */
          [...Array(GUESS_LENGTH - letters.length)].map((_, index) => (
            <div key = { index }></div>
          ))
        }
      </div>
    )
  }

  return (
    <div className = 'row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
