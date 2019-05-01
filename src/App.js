import * as React from 'react'

export default class App extends React.Component {
  state = {
    missingWord: '',
    isLoading: true,
    books: [],
  }

  // it is an action so name should not indicate that it is a value. eg handleInputChange
  inputValue = input => {
    this.setState({
      missingWord: input.target.value,
    })
  }

  submit = event => {
    event.preventDefault()
    this.fetchBooks()
  }

  fetchBooks = () => {
    // In es6 it is generally better to use string  interpolation (`${}`) instead of +
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.missingWord + '+inauthor')
      .then(res => res.json())
      .then(json => this.setState({ books: json.items }, this.checkFetch))
  }

  checkFetch = () => {
    // In a JavaScript program, the correct way to check if an object property is undefined is to use the typeof operator.
    //https://flaviocopes.com/how-to-check-undefined-property-javascript/
    if (this.state.books !== undefined) {
      this.setState({ isLoading: false })
    }
  }

  printBooks = () => {
    let titleImgDescription = []

    // ditto
    if (this.state.books === undefined) {
      return titleImgDescription
    }

    // you could use map as well
    for (let i = 0; i < this.state.books.length; i++) {
      let description = this.state.books[i].volumeInfo.description

      // ditto
      if (description === undefined) {
        description = 'missing description'
      }

      if (description.length > 100) {
        description = description.substr(0, description.lastIndexOf(' ', 100))
        description = description + '...'
      }

      titleImgDescription.push(
        <div key={i}>
          <h4>
            Title:
            <span className="title"> {this.state.books[i].volumeInfo.title}</span>
          </h4>
          {this.getImg(i)}
          <h4 className="description">{description}</h4>
        </div>
      )
    }

    return titleImgDescription
  }

  getImg = i => {
    // ditto
    if (this.state.books[i].volumeInfo.imageLinks === undefined) {
      return <h4>Missing img</h4>
    }
    return <img alt="missing img" src={this.state.books[i].volumeInfo.imageLinks.thumbnail} />
  }

  render() {
    return (
      <main className="container">
        <h1>STX NEXT challenge</h1>
        <form className="input" onSubmit={this.submit}>
          <input type="text" autoFocus placeholder="Title" onChange={this.inputValue} />
          <button>Find</button>
        </form>
        {this.state.isLoading ? 'Write a title to find a book' : this.printBooks()}
      </main>
    )
  }
}
