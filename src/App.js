import React from 'react'
import Books from './Books'

const App = () => {
  return (
    <main className="container">
      <h1>Type the title of a book to search Google's database </h1>
      <Books />
      <span id="footer" />
    </main>
  )
}

export default App
