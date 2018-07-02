import React from 'react';
import update from 'immutability-helper';
import removeByKey from 'utils/removeByKey';
import PropTypes from 'prop-types';
import { set } from 'lodash';

import { StyledSaveButton, StyledInput, StyledTextarea } from './styles';

import FA from 'react-fontawesome';

import Photo from 'src/components/Photo/Photo';
import RatingQuestion from 'src/components/Questions/Rating/RatingQuestion';
import SchemaContainer from './SchemaContainer';

import PHOTO_RATING from 'utils/constants/photoRating';

const defaultPhotoPost = {
    id: null,
    postName: "",
    whatToDo: "",
    createdUTS: null,
    image: null,
    meta: {
        hype: 1,
        userRating: 0,
        editorRating: 0,
        category: "DEV" //TODO: Define these, and make a constant & select dropdown for it
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
    }

    //TODO: Redux
    updatePhotoPostImage = (file, image) => {
        //TODO: Figure out why setting a large base64 image takes time, or find an alternate solution
        this.setState({
            photoPost: {
                ...this.state.photoPost,
                image
            },
            file
        });
    }

    //TODO: Redux
    //TODO: Abstract
    updatePhotoPost = (event) => {
        //TODO: Add some type of validation
        let photoPost = { ...this.state.photoPost };

        //This could be dicey if type isn't set correctly on inputs
        let updateVal = event.target.value;
        if (event.target.type === 'number') updateVal = parseInt(updateVal, 10); 

        //Create a update object that will set the event.target.value on state
        //We can deeply refer to objects as long as the id is set properly on the DOM object
        //e.g. event.target.id = 'meta.userRating'
        let updateDef = {};
        set(updateDef, event.target.id, {$set: updateVal});

        photoPost = update(photoPost, updateDef)
        this.setState({ photoPost });
    }

    //TODO: Redux
    hypePhoto = () => {
        if (!this.state.photoPost.id) return;

        this.props.hypePhotoPost({ variables: { id: this.state.photoPost.id } })
            .then(({ data }) => {
                console.log('hype success!', data);
            }).catch((error) => {
                console.error('there was an error sending the hypePhotoPost', error);
            });
    }

    //TODO: Redux
    //TODO: Validation!
    savePhotoPost = () => {
        let photoPost = {...this.state.photoPost};
        if (this.state.file) photoPost = update(photoPost, {$merge: { upload: this.state.file} });

        //exclude image on upsert, since we upload the file not the image object
        photoPost = removeByKey(photoPost, 'image');

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

        const disableSave = loading || 
        //TODO: Break this out to a validation function
            (!this.state.file && !this.state.photoPost.image) ||
            !this.state.photoPost.postName ||
            !this.state.photoPost.whatToDo ||
            !this.state.photoPost.meta.userRating;

        return (
            <form onSubmit={(event) => { event.preventDefault(); this.savePhotoPost(); }}>
                <Photo loading={loading}
                    isNew={!this.state.photoPost.id}
                    image={this.state.photoPost.image}
                    meta={this.state.photoPost.meta}
                    hypePhoto={this.hypePhoto}
                    updatePhotoPostImage={this.updatePhotoPostImage} />
                <StyledInput id="postName"
                    className="form-control"
                    value={this.state.photoPost.postName}
                    placeholder="a short summary of the edit you want..."
                    onChange={event => this.updatePhotoPost(event)} />
                <StyledTextarea id="whatToDo"
                    className="form-control"
                    placeholder="a paragraph on what you expect the edit to accomplish..."
                    value={this.state.photoPost.whatToDo}
                    onChange={event => this.updatePhotoPost(event)}>
                </StyledTextarea>
                <RatingQuestion loading={loading} 
                    type={PHOTO_RATING.USER.name} 
                    value={this.state.photoPost.meta.userRating}
                    updatePhotoPost={this.updatePhotoPost} />
                <div className='d-flex justify-content-end'>
                    <StyledSaveButton color="success"
                        disabled={disableSave}
                        className="m-1"
                        onClick={() => { this.savePhotoPost(); }}>
                        <FA name="save" /> Save
                    </StyledSaveButton>
                </div>
                
                {/* Debug */}
                <div>{this.state.photoPost ? JSON.stringify(this.state.photoPost) : ''}</div>
            </form>
        );
    }
}

PhotoPost.propTypes = {
    queryId: PropTypes.string
}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(PhotoPost)