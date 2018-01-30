import React from 'react';

import Dropzone from 'react-dropzone';

class PhotoDropzone extends React.Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
    }    
    
    onDrop(acceptedFiles) {
        //Dropzone only accepts one file because multiple: false
        const file = acceptedFiles[0];

        let photoInfo = {
            name: file.name.split('.')[0],
            extension: '.' + file.type.split('/')[1],
            size: file.size
        }

        const updateStateAfterLoad = (readerResult) => {
            photoInfo.base64 = readerResult;
            this.props.photoDropCb(photoInfo);
        }

        const reader = new FileReader();
        reader.onload = () => updateStateAfterLoad(reader.result);
        reader.onabort = () => console.error('file reading was aborted');
        reader.onerror = () => console.error('file reading has failed');

        reader.readAsDataURL(file);
    }

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        return (
            <Dropzone
                disabled={this.props.loading}
                ref={(node) => { this.props.setDropRef(node) }}
                onDrop={(acceptedFiles, rejected) => { this.onDrop(acceptedFiles) }}
                multiple={false}>
            </Dropzone>
        );
    }
}

export default PhotoDropzone;