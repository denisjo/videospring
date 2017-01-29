import React, {Component, PropTypes} from 'react';

class VideoPreview extends Component {
  constructor(props) {
    super(props);

    this.pauseVideo = this.pauseVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);

    this.state = {};
    this.state.video = null;
    this.state.imgVisible = true;
  }

  componentDidUpdate(prevProps) {
  }

  playVideo(event) {
    this.state.imgVisible = false;
    this.state.video.play();
  }

  pauseVideo(event) {
    this.state.imgVisible = true;
    this.state.video.pause();
    this.state.video.currentTime = 0;
  }

  render() {
    return (
        <div className="videoPreview" onMouseEnter={this.playVideo} onMouseLeave={this.pauseVideo}>
            <img src={this.props.cover}  />
            <div>
            <video id={this.props.id} ref={(video) => {this.state.video = video;}}  poster={this.props.cover} preload="auto" loop data-setup="{}" >
                <source src={this.props.previewUrl} type="video/mp4" />
            </video>
            </div>
        </div>
    );
  }
}

VideoPreview.propTypes = {
  id: PropTypes.string,
  previewUrl: PropTypes.string,
  cover: PropTypes.string,
};

export default VideoPreview;