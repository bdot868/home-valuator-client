import React from 'react';
import loader from 'hoc-react-loader'

class NetworkRequest extends React.Component {
  doNetworkRequest(evt) {
    evt.preventDefault();

    this.props.loading((done) => console.log("all finished"))
  }

  render() {
    // The HOC passes an `isLoading` prop to the wrapped component to indicate whether the component
    // is in a loading state, as determined by invocations of the `loading` prop function described
    // above. Changes to the boolean value of this prop (as performed by the higher-order component)
    // will cause React to appropriately re-render this component.
    const {isLoading} = this.props;

    return (
      <div>
        <button onClick={this.doNetworkRequest.bind(this)}>
          {/* Start async network request */}
        </button>
        {isLoading ? 'Loading...' : 'Done!'}
      </div>
    );
  }
}

// export default HOC(NetworkRequest);

export default loader(NetworkRequest)
