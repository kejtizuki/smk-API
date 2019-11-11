import React, { Component } from 'react'
import './App.css';
import Image from './Image/Image'

class App extends Component {

  constructor() {
    super()
    this.state = {
      collectionIDs: null,
      slicedIDs: null
    }

  }

  componentDidMount() {
    // this.getIDs()
  }

  // getIDs = () => {
  //   fetch('https://api.smk.dk/api/v1/art/all_ids')
  //    .then(response => response.json())
  //    .then(data => this.setState({ collectionIDs: data.objectIDs }));
  // }

  render() {
    return (
      <div className="App">
        <Image collectionID="KKSgb11925" />
        <Image collectionID="KMS6630" />
        <Image collectionID="kks1982-156" />
      </div>
    )
  }
}


export default App;
