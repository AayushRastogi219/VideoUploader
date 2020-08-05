import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    let shouldRedirect = false;
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      const getVideoDetails = async ()=>{
        try{
            const response = await fetch('http://127.0.0.1:3333/api/videoList', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
              })
            if (!response.ok) throw Error(response.statusText)
            const responseData = await response.json()
            this.setState({videoList: responseData})
        }catch(error){
            console.log('error while getting video details',error)
        }
      }
      getVideoDetails()
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to="/SignOut" />

    const videos = this.state.videoList.map(video => {
      return (
        <div className="col-md-4" key={video._id}>
          <div className="video-thumbnail img-thumbnail">
            <Link to={'/video/' + video.upload_title}>
                <img src={video.thumbnail_path} alt="video thubmnail" />
                {/* <div className="username"> */}
                  {/* <Link to={'/api/videos/' + video.upload_title}> */}
                    {/* {video.uploader_name} */}
                  {/* </Link> */}
                {/* </div> */}
            </Link>

              <div className= "video-title">
                  <Link to={'/video/' + video.upload_title}>
                    {video.upload_title.replace(/_/g, ' ')}
                  </Link>
              </div>
              <div>
                Uploaded by:{' ' + video.uploader_name}
              </div>

            </div>
            
         
          {/* <span className="username">
            <Link to={'/api/videos/' + video.upload_title}>
              {video.uploader_name}
            </Link>
          </span> */}
          
        </div>
      );
    });

    return (
      <React.Fragment>
        <Navbar />
        <div className="container mt-5">
          <h4>Videos</h4>
          <hr className="my-4" />

          <div className="streams row">
            {videos}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
