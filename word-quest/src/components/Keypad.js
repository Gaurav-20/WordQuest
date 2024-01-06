import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('data/word-database.json')
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
        return (
          <div key = { letter.key } className = { color }>{ letter.key.toUpperCase() }</div>
        )
      })}
    </div>
  )
}
