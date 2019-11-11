import React, { Component } from 'react'
import './image.css'

class Image extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      image: null,
      artInfo: null
    }
  }

  componentDidMount() {
    this.getArt(this.props.collectionID)
    this.getArtInfo(this.props.collectionID)
  }

  getArtInfo = (collectionID) => {

    fetch('https://api.smk.dk/api/v1/iiif/manifest/?id=' + collectionID)
     .then(response => response.json())
     .then(data => {console.log('img', data); this.setState({ artInfo: Object.values(data.metadata[2].value[0])[0] })});

  }

  getArt = (collectionID) => {

    fetch('https://api.smk.dk/api/v1/art/?object_number=' + collectionID + '&output=JSON-LD&lang=en')
     .then(response => response.json())
     .then(data => {console.log('dataaa', data); this.setState({ image: data.thumbnailUrl })});
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
