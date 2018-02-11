import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

class PhotoToolbarUpload extends React.Component {
    render() {
        if (!this.props.hideClear) {
            return (
                <div className='d-flex flex-row-reverse'>
                    <Button color="danger"
                        disabled={this.props.loading}
                        className='m-1'
                        onClick={() => this.props.clearUpload()}>
                        <FA name="times" /> Clear
                    </Button>
                </div>
            );
        }

        if (!this.props.hideUpload) {
            return (
                <div className='d-flex flex-row-reverse'>
                    <Button color="primary"
                        disabled={this.props.loading}
                        title=".jpeg, .png, or .gif"
                        className='m-1'
                        onClick={() => this.props.openUpload()}>
                        <FA name="file" /> Upload a photo
                </Button>
                </div>
            );
        }

        return (<div></div>)
    }
}

PhotoToolbarUpload.propTypes = {
    loading: PropTypes.bool,
    hideClear: PropTypes.bool,
    hideUpload: PropTypes.bool,
    clearUpload: PropTypes.func,
    openUpload: PropTypes.func
}

export default PhotoToolbarUpload;
