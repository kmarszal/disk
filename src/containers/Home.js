import React, { Component } from "react";
import {
  FormGroup, 
  FormControl, 
  InputGroup, 
  Button, 
  ListGroup, 
  ListGroupItem,
} from "react-bootstrap";


import "./Home.css";
import { API } from "aws-amplify";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      files: []
    };
  }

  async componentDidMount() {
    if(!this.props.isAuthenticated) {
      return;
    }

    try {
      const files = await this.files();
      console.log(files);
      this.setState({ files });
    } catch(e) {
      alert(e);
    }
    this.setState({isLoading: false});

  }
  renderFileList = (files) => {
    return files.map(
      (file, _) => 
        <ListGroupItem
          key={file.fileId}
          href={`/files/${file.fileId}`}
          onClick={this.handleFileClick}
          header={file.fileName}
        >
          {"Uploaded: " + new Date(file.uploadedAt).toLocaleString()}
        </ListGroupItem>
    );
  }

  handleFileClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderFiles = () => {
      return (
        <div className="files">
        <form>
      
      <FormGroup>
    <InputGroup>
      
      <FormControl type="text" />
      <InputGroup.Button>
        <Button>Search</Button>
      </InputGroup.Button>
    </InputGroup>
  </FormGroup>
          
          </form>
          
          <ListGroup>
            { !this.state.isLoading && this.renderFileList(this.state.files) }
          </ListGroup>
        </div>
      );
  }

  files() {
    const files = API.get("files", "/files");
    console.log(files); 
    return files;
  }
  
  renderLander = () => {
    return (
      <div className="lander">
        <h1>Disco</h1>
        <p>Just a disk.</p>
      </div>
    );
  }
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated
          ? this.renderFiles()
          : this.renderLander()}
      </div>
    );
  }
}