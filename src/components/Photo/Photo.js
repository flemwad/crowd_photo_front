import React from 'react';
import PropTypes from 'prop-types';
import { get, has, isString } from 'lodash';

import SpinnyLoadingText from '../Loading/SpinnyLoadingText';
import Toolbar from './Toolbar/Toolbar';
import { PhotoContainer, PhotoDiv } from './styles';
import PhotoDropzone from './Dropzone/PhotoDropzone';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.uploadRef = null;
        this.setDropRef = this.setDropRef.bind(this);
        this.clearUpload = this.clearUpload.bind(this);
        this.photoDropCb = this.photoDropCb.bind(this);

        this.DropZoneCmp = this.DropZoneCmp.bind(this);
        this.PhotoDivCmp = this.PhotoDivCmp.bind(this);
        this.PhotoLoadingCmp = this.PhotoLoadingCmp.bind(this);
    }

    //Clear photo state on the parent
    clearUpload = () => this.props.updatePhotoPostImage(null, null, null);

    //Set photo state on the parent after an upload
    photoDropCb = (file, imageInfo, base64) => this.props.updatePhotoPostImage(file, imageInfo, base64);

    //Literall opens the dropzone
    openUpload = () => this.dropRef.open();

    //Kinda wonky, but used so we can open the dropzone from the upload button,
    //maybe do away with this when my dropzone css doesn't suck
    setDropRef = (dropRef) => this.dropRef = dropRef;

    DropZoneCmp() {
        return (
            <PhotoDropzone loading={this.props.loading} 
                photoDropCb={this.photoDropCb} 
                setDropRef={this.setDropRef} />
        );
    }

    PhotoDivCmp() {
        const imageSrc = get(this.props, 'base64', null) || get(this.props, 'image.s3Uri', "");
        return <PhotoDiv className='img-fluid' imageSrc={imageSrc} />;
    }

    PhotoLoadingCmp() {
        return <SpinnyLoadingText />;
    } 

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        let PhotoCmp = this.PhotoLoadingCmp;
        if (!this.props.image && !this.props.loading) PhotoCmp = this.DropZoneCmp;
        else PhotoCmp = this.PhotoDivCmp;

        //Used to determine state of upload buttons
        const photoServerUpload = has(this.props, 'image.s3Uri', false);
        const photoLocalUpload = isString(this.props.base64);

        return (
            <div>
                <PhotoContainer>
                    <PhotoCmp />
                </PhotoContainer>

                <Toolbar loading={this.props.loading}
                    isNew={this.props.isNew}
                    photoServerUpload={photoServerUpload}
                    photoLocalUpload={photoLocalUpload}
                    meta={this.props.meta}
                    hypePhoto={this.props.hypePhoto}
                    clearUpload={this.clearUpload}
                    openUpload={this.openUpload} />
            </div>
        );
    }
}

Photo.propTypes = {
    loading: PropTypes.bool,
    isNew: PropTypes.bool,
    base64: PropTypes.string,
    image: PropTypes.object,
    meta: PropTypes.object,
    hypePhoto: PropTypes.func,
    updatePhotoPostImage: PropTypes.func
}

export default Photo;