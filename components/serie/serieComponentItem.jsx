import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router';
import {BlockPicker} from 'react-color';

import VideoPreview from 'videoPreview';

var data = require('./data.json');


class SerieComponentItem extends Component {
  constructor(props) {
    super(props);

    
     this.state = {
      inputText : ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleTextChange(event) {
    
    this.setState({inputText : event.target.value});
    console.log('Text changed for= ' + event.target.id + " and value= " + this.state.inputText);
  }

  handleColorChange(event) {

  }

  handleSubmit(event) {
    console.log('Submitting inputs');
    event.preventDefault();

  }


  render() {

    const serieId = this.props.params.serieId;    
    const serie = _.find(data.series, {'id':serieId});

    if(_.isNil(serie)) {
      return (
        <div>
          <h2>Serie Item not found</h2>
        </div>
      );
    }

    const componentId = this.props.params.componentId;
    const component = _.find(serie.components , {'id' : componentId});
    if(_.isNil(component)) {
      return (
        <div>
          <h2>Component Item not found</h2>
        </div>
      );
    }

    
    const componentItems = [];

    if(!_.isNil(component.items) && !_.isEmpty(component.items)) {
      componentItems.push(...component.items.map(item => {
        if(item.type === 'string') {
          return (
            <div className="card-preview">
              <h3>{item.label}</h3>
              <input id={item.id} value={this.state.inputText} type="text" onChange={this.handleTextChange}/>
            </div>
          );
        } else if(item.type === 'color') {
          return (
            <div className="card-preview">
              <h3>{item.label}</h3>
              <BlockPicker />
            </div>
          );
        } else {
          return (
            <div className="card-preview">Unknown type...</div>
          );
        }
        
      }));
    }

    if(!_.isNil(componentItems)) {
      return (
        <Row>
          <Col className="col-lg-4 col-md-6 col-xs-12">
            <VideoPreview id={component.id} cover={component.videoCover} previewUrl={component.previewUrl}/>
          </Col>
          <Col className="col-lg-3 col-md-6 col-xs-12">
            {componentItems}
            <button onClick={this.handleSubmit}>Craft It!</button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Col className="col-lg-3 col-md-4 col-xs-6">
          <div className="card">
            <div className="card-header">
              <VideoPreview id={this.props.id} cover={this.props.videoCover} previewUrl={this.props.previewUrl}/>
            </div>
            <div className="card-content">
              <h4>{this.props.title}</h4>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </Col>
      );

    }

    
  }
}

SerieComponentItem.propTypes = {
  id: PropTypes.string,
  previewUrl: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
};

export default SerieComponentItem;
