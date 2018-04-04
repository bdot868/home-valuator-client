import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './zillow.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// var ReactBootstrap = require('react-bootstrap')
// var Modal = ReactBootstrap.Modal

class Zillow extends Component {

  constructor(){
    super()

    this.state = {
      quotes: null,
      modal: false
    }
    this.toggle = this.toggle.bind(this)
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
    this.refs.address.value = ''
    this.refs.citystatezip.value = ''
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

  toggle(){
    this.setState({
      modal: false
    })
  }

  render() {
    var listing = this.props.data
    var num = this.props.money

    console.log(listing)
    console.log(num)

    return (
      <div>
        <div id="estimate-form">
          <h1 id="get-info">How Much Is My Home Worth?</h1>
          <p>Get an instant home-value estimate, and save zestimates to your profile.</p>
          <hr></hr>
          <Form className="" onSubmit={this._newSearch.bind(this)}>
            <FormGroup className="">
              {/* <Label for="zillowAddress">Enter Address</Label> */}
              <Input className="" type='text' placeholder='Enter Street Address' ref='address' id="zillowAddress" />
            </FormGroup>
            <FormGroup>
              {/* <Label for="zillowCityState">Enter City/State or Zip code</Label> */}
              <Input className="" type='text' placeholder='Ex... New York, NY or 11101' ref='citystatezip' id="zillowCityState" />
            </FormGroup>

            <Button color="warning" className="btn">Search</Button>
          </Form>
        </div>

        {listing
          ? (
            <div className="static-modal">
            <Modal isOpen={!!this.props.data} toggle={this.toggle}>
              <ModalHeader id="title">
                Property Data
              </ModalHeader>
                {/* <button onClick={() => this.closeModal()}>X</button> */}
                <ModalBody>
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
                  <ModalFooter>
                    <button className="btn btn-danger" id="save" onClick={this._addQuote.bind(this)}>Save Quote</button>
                  </ModalFooter>
                </div>
                </ModalBody>
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
