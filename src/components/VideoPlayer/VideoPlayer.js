import React from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';

import videojs from 'video.js';
import './videojs.css';
import Navbar from '../Navbar/Navbar';

class VideoPlayer extends React.Component {
  state = {
    loaded: false,
    videoJsOptions: null
  }

  componentDidMount() {
    const getVideoPlayerDetails = async ()=>{
      try{
          const response = await fetch('/api/videoList', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
              }
            })
          if (!response.ok) throw Error(response.statusText)
          const responseData = await response.json()
          responseData.map(video => {
            if (video.upload_title === this.props.match.params.videoTitle) {
              this.setState({
                loaded: true,
                videoJsOptions: {
                  autoplay: false,
                  controls: true,
                  sources: [{
                    src: video.video_path
                  }],
                  fluid: true
                }
              }, () => {
                this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
                });
              });
            }}
          )
      }catch(error){
          console.log('error while getting video details',error)
      }
    }
    getVideoPlayerDetails()
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
    return (
      <React.Fragment>
        <Navbar />
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
            {this.state.loaded ? (
              <div data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
              </div>
            ) : ' Loading ... '}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
