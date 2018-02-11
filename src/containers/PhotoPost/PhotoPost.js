import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { get, merge, set } from 'lodash';

import { StyledSaveButton, StyledInput, StyledTextarea } from './styles';

import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import RatingQuestion from 'src/components/RatingQuestion/RatingQuestion';
import SchemaContainer from './SchemaContainer';

import PHOTO_RATING from 'utils/constants/photoRating';

//TODO: replace this with the loaded data instead
const defaultPhotoPost = {
    id: null,
    postName: "",
    whatToDo: "",
    unixTime: null,
    image: null,
    meta: {
        hype: 1,
        userRating: null,
        editorRating: null,
        category: "DEV" //TODO: Constants for this
    }
};

class PhotoPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = { photoPost: defaultPhotoPost };
        
        this.savePhotoPost = this.savePhotoPost.bind(this);
        this.updatePhotoPostImage = this.updatePhotoPostImage.bind(this);
        this.updatePhotoPost = this.updatePhotoPost.bind(this);
        this.hypePhoto = this.hypePhoto.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { loading, photoPost } = nextProps.photoPostQuery;

        if (!loading && photoPost) this.setState({ photoPost });

        //TODO: change this to some kind of default object
        if (!loading && !photoPost) this.setState({ photoPost: defaultPhotoPost });
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

    updatePhotoPost = (event) => {
        let photoPost = { ...this.state.photoPost };

        //This could be dicey if type isn't set correctly on inputs
        let updateVal = event.target.value;
        if (event.target.type === 'number') updateVal = parseInt(updateVal); 

        photoPost = set(photoPost, event.target.id, updateVal);
        this.setState({ photoPost });
    }

    //TODO: Make this user contextual and store what photos they have hyped
    //Maybe use MongoDB's DBRef or brute force it? idk
    hypePhoto = () => {
        if (!this.state.photoPost.id) return;

        this.props.hypePhotoPost({ variables: { id: this.state.photoPost.id } })
            .then(({ data }) => {
                console.log('hype success!', data);
            }).catch((error) => {
                console.error('there was an error sending the hypePhotoPost', error);
            });
    }

    savePhotoPost = () => {
        const photoPost = merge(this.state.photoPost, { upload: this.state.file });

        //exclude image on upsert, since we upload the file not the image object
        //TODO: Fix the states so image doesn't have to be on state here and remove...
        delete photoPost.image;

        photoPost.unixTime = moment().unix();

        this.props.upsertPhotoPost({ variables: { photoPost } })
            .then(({ data }) => {
                console.log('upsert success!', data);
            }).catch((error) => {
                console.error('there was an error sending the upsertPhotoPost', error);
            });
    }

    render() {
        //If it's new (no queryId), it'll never be loading, just show dropzone
        //otherwise the photoQuery will tell the rest of the cmps if it's done loading
        const loading = !this.props.queryId ? false : this.props.photoPostQuery.loading;

        //TODO: break this out to a helper fn probably as the form gets more complex
        const disableSave = loading || (!this.state.file && !get(this.state, 'photoPost.image'));

        return (
            <div>
                <Photo loading={loading}
                    isNew={!this.state.photoPost.id}
                    image={this.state.photoPost.image}
                    meta={this.state.photoPost.meta}
                    hypePhoto={this.hypePhoto}
                    updatePhotoPostImage={this.updatePhotoPostImage} />
                <StyledInput id="postName"
                    className="form-control"
                    defaultValue={this.state.photoPost.postName}
                    placeholder="a short summary of the edit you want..."
                    onBlur={event => this.updatePhotoPost(event)} />
                <StyledTextarea id="whatToDo"
                    className="form-control"
                    placeholder="a paragraph on what you expect the edit to accomplish..."
                    defaultValue={this.state.photoPost.whatToDo}
                    onBlur={event => this.updatePhotoPost(event)}>
                </StyledTextarea>
                <RatingQuestion loading={loading} 
                    type={PHOTO_RATING.USER.name} 
                    value={this.state.photoPost.meta.userRating}
                    updatePhotoPost={this.updatePhotoPost} />
                <StyledSaveButton color="success"
                    disabled={disableSave}
                    className='m-1'
                    onClick={() => { this.savePhotoPost(); }}>
                    <FA name="save" /> Save
                </StyledSaveButton>
                <div>{this.state.photoPost ? JSON.stringify(this.state.photoPost) : ''}</div>
            </div>
        );
    }
}

PhotoPost.propTypes = {
    queryId: PropTypes.string
}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(PhotoPost)