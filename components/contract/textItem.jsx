import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class TextItem extends Component {
  // Currently the text item once is render there is no need to render again
  // so it's safe to return false in order to avoid not needed rerender
  shouldComponentUpdate() {
    return false;
  }

  render() {
    let className = 'textItem ';
    if (this.props.style) {
      className += classNames(
        {textItemBlock: this.props.style.breakline},
        {textItemBold: this.props.style.bold}
      );
    }
    return (
      <span className={className}>{this.props.text}</span>
    );
  }
}

TextItem.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
};

export default TextItem;
