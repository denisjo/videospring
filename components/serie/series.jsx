import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';

var data = require('./data.json');


class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
        video : [],
        imgVisible : true,
    };
  }

  playVideo(id, event) {
    console.log("Play + " + id);
    this.state.imgVisible = false;
    this.state.video[id].play();
  }

  pauseVideo(id, event) {
    console.log("Pause + " + id);
    this.state.imgVisible = true;
    this.state.video[id].pause();
    this.state.video[id].currentTime = 0;
  }

  render() {
    /*if (!this.props.document) {
      return (
        <div>
          <h2>Empty</h2>
        </div>
      );
    }*/
    const series = [];
    
    series.push(...data.series.map(serie => {
       return (
           
            <Col className="col-lg-3 col-md-3 col-xs-6 card">
              <div className="card-preview">
                <a href="/" onMouseEnter={this.playVideo.bind(this, serie.id)} 
                            onMouseLeave={this.pauseVideo.bind(this, serie.id)}>
                  <img src={serie.videoCover}  />
                  <video id={serie.id} ref={(video) => {this.state.video[serie.id] = video;}}  poster={serie.videoCover} preload="auto" loop data-setup="{}" >
                    <source src={serie.previewUrl} type="video/mp4" />
                  </video>
                </a>
                <h3>{serie.name}</h3>
              </div>
            </Col>
       );
    }));
    //className="video-js vjs-fluid"
    return (

      <div>
        <Row>
            {series}
        </Row>
      </div>
    );
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Series;
