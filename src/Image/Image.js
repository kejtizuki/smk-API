import React, { Component } from 'react'
import './image.css'

class Image extends Component {

  constructor() {
    super()
    this.state = {
      image: 'https://iip.smk.dk/iiif/jp2/kks1982-156.tif.reconstructed.tif.jp2/full/!1600,/0/default.jpg',
      imgID: 'kks1982-156.tif.reconstructed.tif.jp2',
      collectionIDs: []
    }
  }

  componentDidMount() {
    this.getIDs()
    console.log('state ', this.state)
    console.log(this.state.collectionIDs[0])
    // this.getArt('kks1982-156')
    this.getArt('KKS1965-14')
    this.getImage(this.state.imgID)
  }

  getIDs = () => {
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'json';
    let jsonResponse
    xhr.addEventListener('load', () => {

      jsonResponse = xhr.response
      console.log(jsonResponse.objectIDs)
      this.setState({
        collectionIDs: jsonResponse.objectIDs
      })
    })

    xhr.open('GET', 'https://api.smk.dk/api/v1/art/all_ids')
    xhr.send()
  }

  getArt = (collectionID) => {
    var _this = this;
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      console.log('getArt ', xhr.response)
      _this.setState({
        image: xhr.response.thumbnailUrl
      })
    })

    xhr.open('GET', 'https://api.smk.dk/api/v1/art/?object_number=' + collectionID + '&output=JSON-LD&lang=en')
    xhr.send()
  }

  getImage = (imgID) => {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      this.setState({
        image: xhr.responseURL
      })
    })

    // xhr.open('GET', 'https://api.smk.dk/api/v1/thumbnail/' + imgID)
    xhr.open('GET', this.state.image)
    xhr.send()
  }

  render() {
    return (
      <div className="center">
        <img src={this.state.image} width="400" alt="something" className="thumbnail"/>
      </div>
    )
  }
}

export default Image;
