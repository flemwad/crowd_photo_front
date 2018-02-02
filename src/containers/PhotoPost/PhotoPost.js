import React from 'react';
import { get, merge } from 'lodash';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import SchemaContainer from './SchemaContainer';

//TODO: replace this with the loaded data instead
const dummyData1 = {
    id: "1",
    postName: "og_post",
    whatToDo: "make it og",
    bounty: 25.00,
    unixTime: 1516764038,
    image: null,
    meta: {
        hype: 1,
        userRating: 2,
        editorRating: 3,
        category: "test"
    }
};

const dummyData2 = {
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

        this.state = {photoPost: dummyData2};

        this.savePhotoPost = this.savePhotoPost.bind(this);
        this.updatePhotoPostImage = this.updatePhotoPostImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, photoPost } = nextProps.photoPostQuery;

        if (!loading && photoPost) this.setState({ photoPost });

        //TODO: change this to some kind of default object
        if (!loading && !photoPost) this.setState({ photoPost: dummyData2 });
    }

    updatePhotoPostImage = (file, image) => {
        //Setting state here with a larger base64 image causes the app to lock up temporarily
        this.setState({
            photoPost: {
                ...this.state.photoPost,
                image
            },
            file
        });
    }

    savePhotoPost = () => {
        const photoPost = merge(this.state.photoPost, {upload: this.state.file});

        //exclude image on upsert, since we upload the file not the image object
        //TODO: Fix the states so image doesn't have to be on state here and remove...
        delete photoPost.image;

        this.props.upsertPhotoPost({variables: { photoPost }}).then(({ data }) => {
            console.log('upsert sucess!', data);
        }).catch((error) => {
            console.error('there was an error sending the upsertPhotoPost', error);
        });
    }

    render() {
        //If it's new, it'll never be loading, just show dropzone
        //otherwise the photoQuery will tell the rest of the cmps if it's done loading
        const loading = this.props.new ? false : this.props.photoPostQuery.loading;

        //TODO: break this out to a helper fn probably as the form gets more complex
        const disableSave = loading || (!this.state.file && !get(this.state, 'photoPost.image'));

        return (
            <div>
                <Photo loading={loading} 
                    image={this.state.photoPost.image} 
                    updatePhotoPostImage={this.updatePhotoPostImage}/>
                <Button color="success"
                    disabled={disableSave}
                    className='m-1'
                    onClick={() => { this.savePhotoPost(); }}>
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