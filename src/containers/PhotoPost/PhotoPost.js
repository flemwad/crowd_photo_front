import React from 'react';
import _ from 'lodash';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import SchemaContainer from './SchemaContainer';

//TODO: replace this with the loaded data instead
const dummyData = {
    id: "2",
    postName: "hax_post",
    whatToDo: "make it memey",
    bounty: 1337.00,
    unixTime: 1516764038,
    image: null,
    meta: {
        hype: 1337,
        userRating: 5,
        editorRating: 5,
        category: "MEME"
    }
};

class PhotoPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {photoPost: dummyData};

        //TODO: Fix these naming conventions LOL
        this.savePhoto = this.savePhoto.bind(this);
        this.updatePhotoPostImage = this.updatePhotoPostImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, photo } = nextProps.photoQuery;

        if (!loading && photo) this.setState({ photoPost: photo });

        if (!loading && !photo) {
            this.setState({
                photoPost: dummyData
            });
        }
    }

    updatePhotoPostImage = (file, image) => {
        this.setState({
            photoPost: {
                ...this.state.photoPost,
                image: image
            },
            file
        });
    }

    savePhoto = () => {
        const photoInput = _.merge(this.state.photoPost, {upload: this.state.file});

        //exclude image on upsert, since we upload the file not the image object
        //TODO: Fix the states so image doesn't have to be on state here and remove...
        delete photoInput.image;

        this.props.upsertPhoto({variables: { photoInput }})
        .then(({ data }) => {
            console.log('got data', data);
        }).catch((error) => {
            console.log('there was an error sending the query', error);
        });
    }

    render() {
        //If it's new, it'll never be loading, just show dropzone
        //otherwise the photoQuery will tell the rest of the cmps if it's done loading
        const loading = this.props.new ? false : this.props.photoQuery.loading;

        return (
            <div>
                <Photo loading={loading} 
                    image={this.state.photoPost.image} 
                    updatePhotoPostImage={this.updatePhotoPostImage}/>
                <Button color="success"
                    disabled={loading}
                    className='m-1'
                    onClick={() => { this.savePhoto(); }}>
                    <FA name="save" /> Save
                </Button>
                <div>{this.state.photoPost ? JSON.stringify(this.state.photoPost) : ''}</div>
            </div>
        );
    }
}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(PhotoPost)