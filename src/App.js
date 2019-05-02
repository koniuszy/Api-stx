import React from 'react'
import Books from './Books'

const App = () => {
  return (
    <main className="container">
      <h1>
        Type the title of a book to search Google's{' '}
        <a className="link" href="https://developers.google.com/books/docs/v1/using#WorkingVolumes">
          database
        </a>
      </h1>
      <Books />
      <span id="footer" />
    </main>
  )
}

export default App
