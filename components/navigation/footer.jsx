import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';



class Footer extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    
    return (
    <footer>
    <p>Powered by JD Labs</p>
    </footer>
    );
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Footer;
