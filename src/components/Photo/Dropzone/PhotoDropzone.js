import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class PhotoDropzone extends React.Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
    }    
    
    onDrop(acceptedFiles) {
        //Dropzone only accepts one file for now
        const file = acceptedFiles[0];

        let photoInfo = {
            name: file.name.split('.')[0],
            extension: '.' + file.type.split('/')[1],
            size: file.size
        }

        const updateStateAfterLoad = (base64Result) => {
            this.props.photoDropCb(file, photoInfo, base64Result);
        }

        //Read the file and call update photo when it's done
        const reader = new FileReader();
        reader.onload = () => updateStateAfterLoad(reader.result);
        reader.onabort = () => console.error('file reading was aborted');
        reader.onerror = () => console.error('file reading has failed');

        reader.readAsDataURL(file);
    }

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    //Note that multiple: false means only one photo can be uploaded at a time
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

PhotoDropzone.propTypes = {
    loading: PropTypes.bool, 
    photoDropCb: PropTypes.func, 
    setDropRef: PropTypes.func
}

export default PhotoDropzone;