import React, { Component} from "react";
import "./Upload.css";
import { API } from "aws-amplify";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";


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
        console.log(this.state.file)
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

    
    render() {
        return (
            <div className="Upload">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="file">
                        <ControlLabel>Choose file</ControlLabel>
                        <FormControl onChange={this.handleFileChange} type="file"/>
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={this.state.file === null}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Upload"
                        loadingText="Uploading"
                    />
                </form>
            </div>
        );
    }
}
