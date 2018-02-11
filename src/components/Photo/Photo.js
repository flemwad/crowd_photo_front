import React from 'react';
import PropTypes from 'prop-types';
import { get, has } from 'lodash';

import PhotoLoading from './Loading/Loading';
import Toolbar from './Toolbar/Toolbar';
import { PhotoContainer, PhotoDiv } from './styles';
import PhotoDropzone from '../PhotoDropzone/PhotoDropzone';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.uploadRef = null;
        this.setDropRef = this.setDropRef.bind(this);
        this.clearUpload = this.clearUpload.bind(this);
        this.photoDropCb = this.photoDropCb.bind(this);
    }

    //Clear photo state on the parent
    clearUpload = () => this.props.updatePhotoPostImage(null, null);

    //Set photo state on the parent after an upload
    photoDropCb = (file, imageInfo) => this.props.updatePhotoPostImage(file, imageInfo);

    //Literall opens the dropzone
    openUpload = () => this.dropRef.open();

    //Kinda wonky, but used so we can open the dropzone from the upload button,
    //maybe do away with this when my dropzone css doesn't suck
    setDropRef = (dropRef) => this.dropRef = dropRef;

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        const PhotoLoadingCmp = () => <PhotoLoading />;

        //Break this guy out, due to the growing size of the function calls
        const DropzoneCmp = () => (
            <PhotoDropzone loading={this.props.loading} 
                photoDropCb={this.photoDropCb} 
                setDropRef={this.setDropRef} />
        );

        const imageSrc = get(this.props, 'image.base64', null) || get(this.props, 'image.s3Uri', "");
        const PhotoDivCmp = () => <PhotoDiv className='img-fluid' imageSrc={imageSrc} />;

        let PhotoCmp = null;
        if (this.props.loading) PhotoCmp = PhotoLoadingCmp;
        else if (!this.props.image && !this.props.loading) PhotoCmp = DropzoneCmp;
        else PhotoCmp = PhotoDivCmp;

        //Used to determine state of upload buttons
        const photoServerUpload = has(this.props, 'image.s3Uri', false);
        const photoLocalUpload = has(this.props, 'image.base64', false);

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
    image: PropTypes.object,
    meta: PropTypes.object,
    hypePhoto: PropTypes.func,
    updatePhotoPostImage: PropTypes.func
}

export default Photo;