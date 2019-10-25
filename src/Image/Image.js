import React, { Component } from 'react'
import './image.css'

class Image extends Component {

  constructor() {
    super()
    this.state = {
      collectionIDs: [],
      id: 'kks1982-156'
      // Try other ids, for example 'kks1982-156',
    }
  }

  componentDidMount() {
    this.getIDs()

    this.getArt(this.state.id)
    this.getArtInfo(this.state.id)
  }

  componentDidUpdate(prevState) {
    if (prevState.collectionIDs !== this.state.collectionIDs) {
      console.log('print collection IDs ', this.state.collectionIDs)
    }
  }

  getIDs = () => {

    fetch('https://api.smk.dk/api/v1/art/all_ids')
     .then(response => response.json())
     .then(data => this.setState({ collectionIDs: data.objectIDs }));


    //Another way of geting IDs array

    // var xhr = new XMLHttpRequest()
    // xhr.responseType = 'json';
    // let jsonResponse
    // xhr.addEventListener('load', () => {
    //
    //   jsonResponse = xhr.response
    //   console.log(jsonResponse.objectIDs)
    //   this.setState({
    //     collectionIDs: jsonResponse.objectIDs
    //   })
    // })
    //
    // xhr.open('GET', 'https://api.smk.dk/api/v1/art/all_ids')
    // xhr.send()
  }

  // Get image using collectionID
  getArt = (collectionID) => {

    fetch('https://api.smk.dk/api/v1/art/?object_number=' + collectionID + '&output=JSON-LD&lang=en')
     .then(response => response.json())
     .then(data => {console.log('dataaa', data); this.setState({ image: data.thumbnailUrl })});

    //Another way of getting an image

    // var xhr = new XMLHttpRequest()
    // xhr.responseType = 'json';
    //
    // xhr.addEventListener('load', () => {
    //   console.log('getArt ', xhr.response)
    //   this.setState({
    //     image: xhr.response.thumbnailUrl
    //   })
    // })
    //
    // xhr.open('GET', 'https://api.smk.dk/api/v1/art/?object_number=' + collectionID + '&output=JSON-LD&lang=en')
    // xhr.send()
  }

  getArtInfo = (collectionID) => {

    fetch('https://api.smk.dk/api/v1/iiif/manifest/?id=' + collectionID)
     .then(response => response.json())
     .then(data => {console.log('img', data); this.setState({ artInfo: Object.values(data.metadata[2].value[0])[0] })});

    //Another way of getting art info

    // var xhr = new XMLHttpRequest()
    // xhr.responseType = 'json';
    //
    // xhr.addEventListener('load', () => {
    //   console.log('getArt info ', xhr.response)
    //   this.setState({
    //     artInfo: Object.values(xhr.response.metadata[2].value[0])[0]
    //   })
    // })
    //
    // xhr.open('GET', 'https://api.smk.dk/api/v1/iiif/manifest/?id=' + collectionID)
    // xhr.send()
  }

  render() {
    return (
      <div className="center imgContainer">
        {this.state.image && <img src={this.state.image} width="400" alt="something" className="thumbnail"/>}
        { this.state.artInfo && <h4>{this.state.artInfo}</h4> }
      </div>
    )
  }
}

export default Image;
