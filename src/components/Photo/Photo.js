import React from 'react';
import _ from 'lodash';

import PhotoLoading from './PhotoLoading/PhotoLoading';
import Toolbar from './Toolbar/Toolbar';
import { PhotoContainer, PhotoDiv } from './styles';

import Dropzone from 'react-dropzone';

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoFile: null
        }

        this.uploadRef = null;
        this.openUpload = this.openUpload.bind(this);
        this.clearUpload = this.clearUpload.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
        const photo = _.get(nextProps, 'photo', null);

        if (!photo || !photo.image || _.isEmpty(photo.image.base64)) return;

        this.setState({
            photoFile: {
                backgroundImage: `data:image/png;base64,${photo.image.base64.trim().replace(/(\r\n|\n|\r)/gm, "")}`,
                name: photo.image.name,
                extension: photo.image.extension,
                size: photo.image.size
            }
        });
    }

    openUpload = () => this.uploadRef.open();
    clearUpload = () => this.setState({photoFile: null});
    
    onDrop(acceptedFiles) {
        //Dropzone only accepts one file because multiple: false
        const file = acceptedFiles[0];

        let photoFile = {
            name: file.name.split('.')[0],
            extension: '.' + file.type.split('/')[1],
            size: file.size
        }

        const updateStateAfterLoad = (readerResult) => {
            photoFile.backgroundImage = readerResult;
            this.setState({photoFile});
        }

        const reader = new FileReader();
        reader.onload = () => updateStateAfterLoad(reader.result);
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file);
    }

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        const PhotoLoadingCmp = () => (<PhotoLoading />);

        //Break this guy out, due to the growing size of the function calls
        const DropzoneCmp = () => (
            <Dropzone
                ref={(node) => { this.uploadRef = node }}
                onDrop={(acceptedFiles, rejected) => { this.onDrop(acceptedFiles) }}
                multiple={false}>
            </Dropzone>
        )

        const PhotoDivCmp = () => (
            <PhotoDiv className='img-fluid' backgroundImage={this.state.photoFile.backgroundImage} />
        );

        let PhotoCmp = null;
        if (this.props.loading) PhotoCmp = PhotoLoadingCmp;
        else if (!this.state.photoFile && !this.props.loading) PhotoCmp = DropzoneCmp;
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