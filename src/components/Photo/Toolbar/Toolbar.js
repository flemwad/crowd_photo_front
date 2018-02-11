import React from 'react';
import PropTypes from 'prop-types';

import Upload from './Upload/Upload';
import Meta from './Meta/Meta';

class PhotoToolbar extends React.Component {
    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        //If they've already uploaded to the server, 
        //don't let them clear the photo

        return (
            <div className='w-100 p-2'>
                <div className='row mx-auto'>
                    <div className='col-8'>
                        {/* TODO: awkward naming issue here? <Meta meta=... /> */}
                        <Meta 
                            meta={this.props.meta} 
                            hypeDisabled={this.props.isNew}
                            hypePhoto={this.props.hypePhoto} />
                    </div>
                    <div className='col-4'>
                        <Upload loading={this.props.loading} 
                            hideClear={this.props.photoServerUpload || !this.props.photoLocalUpload}
                            hideUpload={this.props.photoServerUpload || this.props.photoLocalUpload}
                            clearUpload={this.props.clearUpload}
                            openUpload={this.props.openUpload} />
                    </div>
                </div>
            </div>
        );
    }
}

PhotoToolbar.propTypes = {
    loading: PropTypes.bool,
    isNew: PropTypes.bool,
    photoServerUpload: PropTypes.bool,
    photoLocalUpload: PropTypes.bool,
    meta: PropTypes.object,
    hypePhoto: PropTypes.func,
    clearUpload: PropTypes.func,
    openUpload: PropTypes.func 
}

export default PhotoToolbar;