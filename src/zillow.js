import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './zillow.css'
var ReactBootstrap = require('react-bootstrap')
var Modal = ReactBootstrap.Modal

class Zillow extends Component {

  constructor(){
    super()

    this.state = {
      quotes: null,
      isModalOpen: false
    }
    //this._toggleModal = this._toggleModal.bind(this)
  }


  componentDidMount(){
    clientAuth.getQuotes().then(res => {
      this.setState({
        quotes: res.data
      })
    })
  }

  _newSearch(evt){
    evt.preventDefault();
    const locationData = {
      address: this.refs.address.value,
      citystatezip: this.refs.citystatezip.value
    }

    this.props.onSearch(locationData)
  }

  _addQuote(evt){
    evt.preventDefault()
    const newQuote = {
      street: this.props.data.street,
      city: this.props.data.city,
      state: this.props.data.state,
      zestimate: this.props.data.zestimate,
      useCode: this.props.data.useCode,
      beds: this.props.data.beds,
      baths: this.props.data.baths,
      sqft: this.props.data.sqft
    }
    console.log(newQuote)
    clientAuth.addQuote(newQuote).then(res => {
      console.log(res.data)
      this.setState({
        quotes: [
          ...this.state.quotes,
          res.data
        ]
      })
    })
  }

  _deleteQuote(id){
    clientAuth.deleteQuote(id).then((res => {
      this.setState({
        quotes: this.state.quotes.filter((quote) => {
          return quote._id !== id
        })
      })
    }))
  }

  render() {
    var listing = this.props.data
    var num = this.props.money

    console.log(listing)
    console.log(num)

    return (
      <div>
        <h1 id="get-info">Get Property Info</h1>
        <form className="form-inline" onSubmit={this._newSearch.bind(this)}>
          <div className="form-group" id="address">
            <label>Enter Address</label>
            <input className="form-control" type='text' placeholder='Street Address' ref='address' id="zillow" />
          </div>
          <div className="form-group" id="citystatezip">
            <label>Enter City/State or Zip code</label>
            <input className="form-control" type='text' placeholder='Ex... New York, NY or 11101' ref='citystatezip' id="zillow" />
          </div>

          <button className="btn" type='submit'>Search</button>
        </form>

        {listing
          ? (
            <div className="static-modal">
            <Modal show={!!this.props.data} onHide={this.props.onDismissModal}>
              <Modal.Header closeButton>
                <Modal.Title id="title">Property Data</Modal.Title>
              </Modal.Header>
                {/* <button onClick={() => this.closeModal()}>X</button> */}
                <Modal.Body>
                <div className='listing'>
                  <p><strong>City:</strong> {listing.city}</p>
                  <p><strong>State:</strong> {listing.state}</p>
                  <p><strong>Street:</strong> {listing.street}</p>
                  <p><strong>Zipcode:</strong> {listing.zipcode}</p>
                  <p><i>{listing.useCode}</i></p>
                  <p><strong>Address:</strong> {listing.street}, {listing.city}, {listing.state}</p>
                  <div className="table-responsive">
                          <div className="details"><p>{listing.sqft} Sq.ft</p></div>
                          <div className="details"><p>{listing.beds} Beds</p></div>
                          <div className="details"><p>{listing.baths} Baths</p></div>
                  </div>

                  <h3>Your home is worth:</h3>
                  <h2 className="amount">${num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h2>
                  <Modal.Footer>
                    <button className="btn btn-danger" id="save" onClick={this._addQuote.bind(this)}>Save Quote</button>
                  </Modal.Footer>
                </div>
                </Modal.Body>
              </Modal>
            </div>
              )
              : null
            }
      </div>

    )
  }
}

export default Zillow
