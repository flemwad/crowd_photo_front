import React, { Component } from 'react';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import SchemaContainer from './SchemaContainer';

class PhotoPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: {
                postName: 'a new photo'
            }
        };

        //TODO: Fix these naming conventions LOL
        this.savePhoto = this.savePhoto.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, photo } = nextProps.photoQuery;

        if (!loading && photo) this.setState({ photo });

        if (!loading && !photo) {
            this.setState({
                photo: {
                    postName: 'a new photo'
                }
            });
        }
    }

    updatePhoto = (photoImage) => {
        //DEV: Haxxed in an upsert here for testing
        this.setState({
            photo: {
                id: "2",
                postName: "hax_post",
                whatToDo: "make it memey",
                bounty: 1337.00,
                unixTime: 1516764038,
                image: photoImage,
                meta: {
                    hype: 1337,
                    userRating: 5,
                    editorRating: 5,
                    category: "MEME"
                }
            }
        });
    }

    savePhoto = () => {
        //TODO: Change this to send a Blob file instead of a string for image
        //base64 strings that are too big respond with 400 to the client
        //May also need to use: https://github.com/jaydenseric/apollo-upload-client

        //TODO: Move this into the mutation file themselves?
        this.props.upsertPhoto({
            variables: { photoInput: this.state.photo }
        })
        .then(({ data }) => {
            console.log('got data', data);
        })
        .catch((error) => {
            console.log('there was an error sending the query', error);
        });
    }

    uploadImage = (file) => {
        if (!file) return console.log('cannot upload no file');

        this.props.uploadImage({
            variables: {file: file}
        }).then(({ data }) => {
            console.log('uploadImage: file upload success', data);
        })
        .catch((error) => {
            console.log('uploadImage: there was an error sending the file', error);
        });
    }

    render() {
        const { loading } = !this.props.new ? this.props.photoQuery.loading : false;

        return (
            <div>
                <Photo loading={loading} 
                    photo={this.state.photo} 
                    updatePhoto={this.updatePhoto}
                    uploadImage={this.uploadImage} />
                <Button color="success"
                    disabled={loading}
                    className='m-1'
                    onClick={() => { this.savePhoto(); }}>
                    <FA name="save" /> Save
                </Button>
                <div>{this.state.photo ? JSON.stringify(this.state.photo) : ''}</div>
            </div>
        );
    }
}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(PhotoPost)