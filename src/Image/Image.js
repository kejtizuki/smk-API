import React, { Component } from 'react'
import { render } from 'react-dom'
import './image.css'

class Image extends Component {

  constructor() {
    super()
    this.state = {
      image: ''
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      console.log(xhr.responseURL)
      this.setState({
        image: xhr.responseURL
      })
    })

    xhr.open('GET', 'https://api.smk.dk/api/v1/thumbnail/f1bbfd0b-7436-4cb2-ab12-04f6bb79ec89.jpg')
    xhr.send()
  }

  render() {
    return (
      <div>
        <img src={this.state.image} width="300" />
      </div>
    )
  }
}

export default Image;
