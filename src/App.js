import * as React from 'react'

export default class App extends React.Component {
  state = {
    missingWord: '',
    isLoading: true,
    books: []
  }

  inputChange = input => {
    this.setState({
      missingWord: input.target.value
    })
  }

  submit = event => {
    event.preventDefault()
    this.fetchBooks()
  }

  fetchBooks = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.missingWord}+inauthor`)
      .then(res => res.json())
      .then(json => this.setState({ books: json.items }, this.checkFetch))
  }

  checkFetch = () => {
    if (typeof this.state.books !== 'undefined') {
      this.setState({ isLoading: false })
    }
  }

  printBooks = () => {
    let titleImgDescription = []

    if (typeof this.state.books === 'undefined') {
      return titleImgDescription
    }

    this.state.books.map(el => {
      let description = el.volumeInfo.description

      if (typeof description === 'undefined') {
        description = 'missing description'
      } else if (description.length > 100) {
        description = description.substr(0, description.lastIndexOf(' ', 100))
        description = description + '...'
      }

      titleImgDescription.push(
        <div key={el.id}>
          <h4>
            Title:
            <span className="title"> {el.volumeInfo.title}</span>
          </h4>
          {this.getImg(el)}
          <h4 className="description">{description}</h4>
        </div>
      )
      return 1
    })

    return titleImgDescription
  }

  getImg = el => {
    if (typeof el.volumeInfo.imageLinks === 'undefined') {
      return <h4>Missing img</h4>
    }
    return <img alt="missing img" src={el.volumeInfo.imageLinks.thumbnail} />
  }

  render() {
    return (
      <main className="container">
        <h1>STX NEXT challenge</h1>
        <form className="input" onSubmit={this.submit}>
          <input type="text" autoFocus placeholder="Title" onChange={this.inputChange} />
          <button>Find</button>
        </form>
        {this.state.isLoading ? 'Write a title to find a book' : this.printBooks()}
      </main>
    )
  }
}
