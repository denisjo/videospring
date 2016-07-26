import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Scroller from 'scroller';
import CollapsibleControl from 'collapsibleControl';
import StatusInfo from 'statusInfo';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isExpanded && ! prevProps.isExpanded) {
      const container = document.getElementById('contractContentArea');
      const inputEl = ReactDOM.findDOMNode(this);
      Scroller.scrollTo(container, inputEl.offsetTop, 400);
    }
  }

  handleToggle() {
    this.props.handleToggle(this.props.id);
  }

  render() {
    const statusInfo = typeof this.props.isValid === 'undefined' ?
      null :
      <StatusInfo
        isValid={this.props.isValid}
        hasChanges={this.props.hasChanges}
        classNames="pull-right"
      />;
    return (
      <div className={`panel ${this.props.classes ? this.props.classes : ''}`}>
        <div className={`panel-heading ${this.props.headerClasses ? this.props.headerClasses : ''}`}>
          <h4 className="panel-title">
            <CollapsibleControl isExpanded={this.props.isExpanded} />
            <a role="button" onClick={this.handleToggle}>
              {this.props.title}
            </a>
            {statusInfo}
          </h4>
        </div>
        <div className={classNames('panel-collapse collapse', {in: this.props.isExpanded})}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  handleToggle: PropTypes.func,
  classes: PropTypes.string,
  headerClasses: PropTypes.string,
  isExpanded: PropTypes.bool,
  isValid: PropTypes.bool,
  hasChanges: PropTypes.bool,
};

export default Panel;
