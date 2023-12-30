import { useState } from 'react'

const useWordle = (solution) => {

  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([]) // guess is an array of objs denoting character and color
  const [history, setHistory] = useState([]) // guess is a string of actual guessed words
  const [isCorrect, setIsCorrect] = useState(false)

  // Format a guess into an array of letter objects
  const formatGuess = () => {

  }

  // Add new guess to the guesses state
  // Update the isCorrect state if the solution is correct
  // Increment turn by one
  const addNewGuess = () => {

  }

  // Handle key-up event and track current guess
  // Add this guess when user presses enter (and it is valid)
  const handleKeyUp = ({ key }) => {

    // Case if the backspace key is pressed for deleting
    if (key === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1))
      }
      return
    }
    
    // Key must be alphabet only, check for that
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key.toUpperCase())
      }
    }

  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyUp
  }

}

export default useWordle