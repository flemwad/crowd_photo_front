import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import { GET_PHOTO } from 'src/api/Photo/Query';
import { UPSERT_PHOTO } from 'src/api/Photo/Mutation';

class PhotoPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: {
                postName: 'a new photo'
            }
        };

        this.savePhoto = this.savePhoto.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, photo } = nextProps.data;

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

        this.props.mutate({
            variables: { photoInput: this.state.photo }
        })
        .then(({ data }) => {
            console.log('got data', data);
        })
        .catch((error) => {
            console.log('there was an error sending the query', error);
        });
    }

    render() {
        const { loading } = this.props.data;

        return (
            <div>
                <Photo loading={loading} photo={this.state.photo} updatePhoto={this.updatePhoto} />
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

//TODO: get from a list view an RR4:
const id = 2;

//This looks weird, but it's an UPSERT mutation and GET query composed into one PhotoPost component
//It will expose things like this.props.data.loading && photo, also this.props.mutate function
//In the future this will be abstracted to Detail HOC
export default graphql(UPSERT_PHOTO())(graphql(GET_PHOTO(id))(PhotoPost));