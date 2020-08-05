import React, {Component} from 'react' 
import { Redirect } from 'react-router-dom';
import {Form} from '../form/Form'
import './Upload.css'
import { ToastContainer, toast } from 'react-toastify';
import { Progress } from 'reactstrap';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends Component{
    state = {
        selectedVideos: null,
        loaded: 0
    }
        
    validateFile = (event) => {
        const files = event.target.files
        if(files.length > 1){
            toast.error('Maximum 1 file is allowed')
            event.target.value = null
            return false
        }
        else{
            let error=''
            for(let i=0; i<files.length; i++){
                if(files[i].size > 52428800){
                    error += files[i].name + ', '
                }
            }
            if(error !== ''){
                event.target.value = null
                toast.error(error + " is/are too large. Please select file size < 50Mb")
            }
        }
        return true
    }

    fileChangeHandler = (event) => {
        if(this.validateFile(event)){
            this.setState({
                selectedVideos: event.target.files,
                loaded:0
            });
        }
    }

    fileUploadHandler = (event) => {
        const data = new FormData()
        if(this.state.selectedVideos !== null){
            for(let i=0; i< this.state.selectedVideos.length; i++){
                data.append('file', this.state.selectedVideos[i]);
            }
            const uploadDetails = async ()=>{
                try{
                    const response = await axios.post('/api/upload', data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                        },
                        onUploadProgress: function(progressEvent) {
                            this.setState({
                                loaded: parseInt(Math.round( (progressEvent.loaded * 100) / progressEvent.total ))
                            });
                        }.bind(this)
                    })
                    if (response.statusText === 'OK') toast.success('Upload Successful');
                }catch(error){
                    console.log('error while file upload',error)
                    toast.error(`Upload Fail with status: ${error.statusText}`);
                }
            }
            uploadDetails()
        }
    }

    render(){
        if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
        return(
            <>
            <Navbar />
            <div className="container mt-5">
                <div className="form-group">
                    <ToastContainer />
                </div>
                <h4>Upload Video</h4>
                <hr className="my-4" />
                <Form form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
                <div className="form-group files">
                    <label>Upload Your Videos Here</label>
                        <input
                            className="form-control"
                            type="file"
                            name="file"
                            className="form-control"
                            multiple="multiple"
                            accept="video/*"
                            onChange={this.fileChangeHandler} />
                        <Progress max="100" color="success" value={this.state.loaded} className="mt-4 mb-1">
                            {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
                        </Progress>
                        <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={this.fileUploadHandler}>Upload Video
                        </button>
                    </div>
                </Form>
            </div>
            </>
        )
    }
}
export default Upload