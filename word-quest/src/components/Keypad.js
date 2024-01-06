import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null)

  function simulateKeyPress(letter) {
    dispatchEvent(new KeyboardEvent('keyup', { key: letter }))
  }

  useEffect(() => {
    fetch('database.json')
    .then(res => res.json())
    .then(json => {
      const fetchedLetters = json['letters']
      setLetters(fetchedLetters)
    })
  }, [])

  return (
    <div className = 'keypad'>
      {letters && letters.map((letter) => {
        const color = usedKeys[letter.key]
        if (letter.key === 'Enter') {
          return (
            <button key = { letter.key } onClick = { () => simulateKeyPress(letter.key) }>EN</button>
          )  
        }
        if (letter.key === 'Backspace') {
          return (
            <button key = { letter.key } onClick = { () => simulateKeyPress(letter.key) }>BS</button>
          )
        }
        return (
          <button key = { letter.key }  onClick = { () => simulateKeyPress(letter.key) } className = { color }>{ letter.key.toUpperCase() }</button>
        )
      })}
    </div>
  )
}
