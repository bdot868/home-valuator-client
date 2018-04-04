import React, {Component} from 'react';
import clientAuth from './clientAuth';
// var ReactBootstrap = require('react-bootstrap')
// var Modal = ReactBootstrap.Modal
import {  Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Profile extends Component {
  state = {
    quotes: [],
    toggleQuote: false,
    selectedQuote:{},
    approxAmount: ''
  }

  componentDidMount(){
    clientAuth.getQuotes().then(res => {
      // console.log(res.data);
      this.setState({
        quotes: res.data
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

  _showInfo(quote){
    console.log('show something')
    console.log(typeof quote.zestimate);
    var num = parseInt(quote.zestimate, 10);
    console.log(num.toLocaleString('en'))
    this.setState({
      toggleQuote: !this.state.toggleQuote,
      selectedQuote: quote,
      approxAmount: num.toLocaleString('en')
    })
  }
  _clearToggle() {
    this.setState({
      toggleQuote: null
    })
  }

  _deleteUser(evt){
    console.log(evt.target.id)
    clientAuth.deleteUser(evt.target.id).then((res => {
      this.setState({
        currentUser: null,
        view: 'home'
        })
      })
    )
  }


  render() {
     var amount = this.state.approxAmount
     console.log(amount)
    const quotes = this.state.quotes.map((quote, i) => {
      // console.log(quote);
      return (

            <Col xs="6" sm="4" key={i}>
              <div>
              <div key={i} className="quote-item" id="quote-div"  onClick={this._showInfo.bind(this, quote)}>
                <p><span>{quote.street}, {quote.city}, {quote.state}</span></p>
                <p><strong>{quote.useCode}</strong></p>
                <h4>${quote.zestimate.toLocaleString('en')}</h4>
                <div className="quote-item">
                  <button onClick={this._deleteQuote.bind(this, quote._id)} className=""><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </Col>
      )
    })
    return (
      <div className="container">
        <div>
          <h1 id='username'>{this.props.myUser.name}</h1>
        </div>



        <hr></hr>
        <Container>
          <Row id="quote-row">
                {quotes}
            </Row>
          </Container>


        <Modal show={!!this.state.toggleQuote} onHide={this._clearToggle.bind(this)}>
          <ModalHeader id="title" closeButton>
            Property Data
          </ModalHeader>
            <ModalBody>
            <div className='listing'>
              <p><strong>Street:</strong> {this.state.selectedQuote.street}</p>
              <p><strong>City:</strong>: {this.state.selectedQuote.city}</p>
              <p><strong>State:</strong> {this.state.selectedQuote.state}</p>
              <div className="table-responsive">
                      <div className="details"><p>{this.state.selectedQuote.sqft} Sq.ft</p></div>
                      <div className="details"><p>{this.state.selectedQuote.beds} Beds</p></div>
                      <div className="details"><p>{this.state.selectedQuote.baths} Baths</p></div>
              </div>

              <p><i>{this.state.selectedQuote.useCode}</i></p>
              <h3>Home Value:</h3>
              <h2>${amount}</h2>
            </div>
            </ModalBody>
          </Modal>
      </div>

     )

  }

}

export default Profile;
