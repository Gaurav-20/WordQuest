import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'

function App() {

  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('data/word-database.json')
    .then(res => res.json())
    .then(json => {
      const solutionsArr = json['solutions']
      const randomSolution = solutionsArr[Math.floor(Math.random() * solutionsArr.length)]
      setSolution(randomSolution.word.toUpperCase())
    })
  }, [setSolution])

  return (
    <div className = 'App'>
      <h1>Word Quest</h1>
      {solution && <Wordle solution={ solution } />}
    </div>
  );
}

export default App;
