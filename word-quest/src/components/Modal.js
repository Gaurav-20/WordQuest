import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className = 'modal'>
      {isCorrect && (
        <div>
          <h1>You win!</h1>
          <p className = 'solution correct'>{ solution }</p>
          <p>You found the word in { turn } attempts!</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p className = 'solution incorrect'>{ solution }</p>
          <p>Better luck next time!</p>
        </div>
      )}
    </div>
  )
}
