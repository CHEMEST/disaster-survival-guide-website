import React, { Component } from 'react';

import OverpassMap from './OverpassMap.js';

class Location extends Component {

  render() {
    return (
      <div>
        <OverpassMap />
      </div>
    );
  }
}

export default Location;