import React from 'react';

import PhotoLoading from './PhotoLoading/PhotoLoading';
import Toolbar from './Toolbar/Toolbar';
import { PhotoContainer, PhotoDiv } from './styles';
import PhotoDropzone from '../PhotoDropzone/PhotoDropzone';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null
        }

        this.uploadRef = null;
        this.setDropRef = this.setDropRef.bind(this);
        this.clearUpload = this.clearUpload.bind(this);
        this.photoDropCb = this.photoDropCb.bind(this);
        this.image = null;
    }

    componentWillReceiveProps(nextProps, nextState) {
        const image = nextProps.image || null;

        this.setState({image});
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
            <PhotoDropzone photoDropCb={this.photoDropCb} setDropRef={this.setDropRef} loading={this.props.loading} />
        );

        const PhotoDivCmp = () => (
            <PhotoDiv className='img-fluid' base64Image={this.state.image.base64} />
        );

        let PhotoCmp = null;
        if (this.props.loading) PhotoCmp = PhotoLoadingCmp;
        else if (!this.state.image && !this.props.loading) PhotoCmp = DropzoneCmp;
        else PhotoCmp = PhotoDivCmp;

        return (
            <div>
                <PhotoContainer>
                    <PhotoCmp />
                </PhotoContainer>

                <Toolbar loading={this.props.loading} 
                    hideUpload={this.state.image} 
                    clearUpload={this.clearUpload}
                    openUpload={this.openUpload} />
            </div>
        );
    }
}

export default Photo;