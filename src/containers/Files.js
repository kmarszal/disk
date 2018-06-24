import React, {Component} from "react";
import { API, Storage} from "aws-amplify";
import LoaderButton from "../components/LoaderButton"
import { Button,Grid, Row, Col } from "react-bootstrap";
import {s3Remove} from "../libs/awsLib";
import "./Files.css";
export default class Files extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            fileURL: null
        };
    }

    async componentDidMount() {
        try {
            let fileURL;
            const file = await this.getFile();
            fileURL = await Storage.vault.get(file.fileURL);
            this.setState({
                file, 
                fileURL,
            });
        } catch (e) {
            alert (e);
        }
    }

    getFile() {
        return API.get("files", `/files/${this.props.match.params.id}`);
    }

    deleteFile() {
        return API.del("files", `/files/${this.props.match.params.id}`);
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this file?"
        );

        if(!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteFile();
            s3Remove(this.state.file.fileURL);
            this.props.history.push("/");
        } catch(e) {
            alert(e);
            this.setState({ idDeleting: false });
        }

    }

    render() {
        return (
            <div className="Files">
                <h4> 
                    {this.state.file !== null 
                        && this.state.file.fileName }
                </h4>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                        {this.state.file !== null 
                            && "Uploaded: " + new Date(this.state.file.uploadedAt).toLocaleString()}
                        </Col>
                        <Col xs={6} md={4}>
                            <Button
                                block
                                bsSize="large"
                                bsStyle="primary"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.state.fileURL}
                            >
                                Download
                            </Button>
                            <LoaderButton
                                block
                                bsStyle="danger"
                                bsSize="large"
                                isLoading={this.state.isDeleting}
                                onClick={this.handleDelete}
                                text="Delete"
                                loadingText="Deleting…"
                            />
                    </Col>
                    </Row>
                </Grid>
                {/* <Button
                    block
                    bsSize="large"
                    bsStyle="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.fileURL}
                >
                    Download
                </Button>
                <LoaderButton
                    block
                    bsStyle="danger"
                    bsSize="large"
                    isLoading={this.state.isDeleting}
                    onClick={this.handleDelete}
                    text="Delete"
                    loadingText="Deleting…"
                /> */}
             </div>
        );
    }
}