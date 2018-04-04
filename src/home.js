import React, {Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './home.css';
import Zillow from './zillow'


class Home extends Component {
  constructor(){
    super()
    this.state = {
      view: 'home'
    }
    this._start=this._start.bind(this)
  }

  _start(evt){
    const view = this.state.view
    console.log(view);
    this.props.goTo(view)
  }

  render() {
    console.log(this.state.view);
    return (
      <div id="home-banner">

        <Jumbotron>
          <h1 id="tagname">Home Valuator!</h1>
          <p className="lead">Home appraiser is a web application where users can send Api calls to Zillow.com's api service to return an estimated current market value on any given property.</p>
          <hr className="my-2" />
          <p>A great tool for Buyers and Sellers to use</p>
          <p className="lead">
            <Button color="primary" onClick={this._start} name="zillow">Get Started</Button>
          </p>
        </Jumbotron>
      </div>

    )
   }
}


export default Home;
