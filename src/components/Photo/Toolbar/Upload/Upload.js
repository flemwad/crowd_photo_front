import React from 'react';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

export default class PhotoToolbarUpload extends React.Component {

    render() {
        if (this.props.hideUpload) {
            return (
                <div className='d-flex flex-row-reverse'>
                    <Button color="danger" 
                        disabled={this.props.loading} 
                        className='m-1'
                        onClick={() => { this.props.clearUpload(); }}>
                        <FA name="times" /> Clear
                    </Button>
                </div>
            );
        }

        return (
            <div className='d-flex flex-row-reverse'>
                <Button color="primary" 
                    disabled={this.props.loading} 
                    className='m-1' 
                    onClick={() => { this.props.uploadImage(); }}>
                    <FA name="upload" /> Upload
                </Button>
            </div>
        );
    }
}
