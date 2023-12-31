import { useState } from 'react'
import { ALPHABET_REGEX, GUESS_LENGTH, MAX_GUESSES } from '../constants'

const useWordle = (solution) => {

  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(MAX_GUESSES)]) // guess is an array of objs denoting character and color
  const [history, setHistory] = useState([]) // guess is a string of actual guessed words
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})

  // Format a guess into an array of letter objects
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((c) => {
      return { key: c, color: 'grey' }
    })

    // Find green letters, if any
    formattedGuess.forEach((element, index) => {
      if (solutionArray[index] === element.key) {
        formattedGuess[index].color = 'green'
        solutionArray[index] = null
      }
    })

    // Find yellow letters, if any
    formattedGuess.forEach((element, index) => {
      if (solutionArray.includes(element.key) && element.color !== 'green') {
        formattedGuess[index].color = 'yellow'
        solutionArray[solutionArray.indexOf(element.key)] = null
      }
    })

    return formattedGuess
  }

  // Add new guess to the guesses state
  // Update the isCorrect state if the solution is correct
  // Increment turn by one
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })
    setTurn((prevTurn) => {
      return prevTurn + 1
    })
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}
      formattedGuess.forEach((letter) => {
        const currColor = newKeys[letter.key]
        if (letter.color === 'green') {
          newKeys[letter.key] = 'green'
          return
        }
        if (letter.color === 'yellow' && currColor !== 'green') {
          newKeys[letter.key] = 'yellow'
          return
        }
        if (letter.color === 'grey' && currColor !== 'green' && currColor !== 'yellow') {
          newKeys[letter.key] = 'grey'
          return
        }
      })
      return newKeys
    })
    setCurrentGuess('')
  }

  // Handle key-up event and track current guess
  // Add this guess when user presses enter (and it is valid)
  const handleKeyUp = ({ key }) => {

    // Case if the enter key is pressed for submitting guess
    if (key === 'Enter') {
      // Only add guess if :
      // Turn is less than equal to MAX_GUESSES
      // If this guess is not previously added
      // Length of current word is exactly MAX_WORD_LENGTH
      if (turn > MAX_GUESSES) {
        console.log('All guesses are already used up')
        return
      }
      if (history.includes(currentGuess)) {
        console.log('This word was already tried')
        return
      }
      if (currentGuess.length !== GUESS_LENGTH) {
        console.log(`The word must be exactly ${GUESS_LENGTH} chars long`)
        return
      }
      const formattedGuess = formatGuess()
      addNewGuess(formattedGuess)
    }

    // Case if the backspace key is pressed for deleting
    if (key === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1))
      }
      return
    }
    
    // Key must be alphabet only, check for that
    if (ALPHABET_REGEX.test(key)) {
      if (currentGuess.length < GUESS_LENGTH) {
        setCurrentGuess((prev) => prev + key.toUpperCase())
      }
    }

  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyUp
  }

}

export default useWordle