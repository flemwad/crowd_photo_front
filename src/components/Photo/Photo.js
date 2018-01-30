import React from 'react';
import _ from 'lodash';

import PhotoLoading from './PhotoLoading/PhotoLoading';
import Toolbar from './Toolbar/Toolbar';
import { PhotoContainer, PhotoDiv } from './styles';
import PhotoDropzone from '../PhotoDropzone/PhotoDropzone';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoFile: null
        }

        this.uploadRef = null;
        this.setDropRef = this.setDropRef.bind(this);
        this.clearUpload = this.clearUpload.bind(this);
        this.photoDropCb = this.photoDropCb.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
        const photo = _.get(nextProps, 'photo', null);

        //TODO: remove image && base64 check when done testing, 
        //they're required values on GraphQL schema anyway
        if (!photo || !photo.image || _.isEmpty(photo.image.base64)) return;

        this.setState({
            image: {
                base64: photo.image.base64.trim(),
                name: photo.image.name,
                extension: photo.image.extension,
                size: photo.image.size
            }
        });
    }

    //Clear photo state on the parent
    clearUpload = () => this.props.updatePhoto(null);

    //Set photo state on the parent after an upload
    photoDropCb = (fileInfo) => this.props.updatePhoto(_.merge(this.state.photoFile, fileInfo));

    //Literall opens the dropzone
    openUpload = () => this.dropRef.open();

    //Kinda wonky, but used so we can open the dropzone from the upload button,
    //maybe do away with this when my dropzone css doesn't suck
    setDropRef = (dropRef) => this.dropRef = dropRef;

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        const PhotoLoadingCmp = () => (<PhotoLoading />);

        //Break this guy out, due to the growing size of the function calls
        const DropzoneCmp = () => (
            <PhotoDropzone photoDropCb={this.photoDropCb} setDropRef={this.setDropRef} loading={this.props.loading} />
        )

        const PhotoDivCmp = () => (
            <PhotoDiv className='img-fluid' backgroundImage={this.state.image.base64} />
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
                    hideUpload={this.state.photoFile} 
                    clearUpload={this.clearUpload}
                    openUpload={this.openUpload} />
            </div>
        );
    }
}

export default Photo;