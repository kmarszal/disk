import React, { Component} from "react";
import "./Upload.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import "./Upload.css";
import Dropzone from 'react-dropzone'
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";



export default class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        file: null,

    }
  }

    uploadFile(file) {
        return API.post("files", "/files", {
            body: file
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true});
        try {
            const fileURL = await s3Upload(this.state.file);
    
            await this.uploadFile({
                fileURL,
                fileName: this.state.file.name,
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleFileChange = event => {
        this.setState({
            file: event.target.files[0],
        });
    }
    onDrop(files) {
        this.setState({
          file: files[0],
        });
      }

    
    render() {
        return (
            <div className="Upload">
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p className="droptext" >Drop some file here, or click to select file to upload.</p>
                    </Dropzone>
                </div>
                <div className="file">
                    <h4>
                        {this.state.file !== null ? this.state.file.name : "No file selected."}
                    </h4>
                </div>
                <div className="button">
                    <form onSubmit={this.handleSubmit}>
                        {/* <FormGroup controlId="file">
                            <ControlLabel>Choose file</ControlLabel>
                            <FormControl  
                                    // block
                                    // bsSize="large"
                                    // bsStyle="primary"
                                    onChange={this.handleFileChange} 
                                    type="file"/>
                        </FormGroup> */}

                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                        disabled={this.state.file === null}
                        isLoading={this.state.isLoading}
                        text="Upload"
                        loadingText="Uploading"
                    />
                    </form>
                </div>
            </div>
        );
    }
}
