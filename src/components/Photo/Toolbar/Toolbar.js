import React from 'react';
import { has } from 'lodash';

import Upload from './Upload/Upload';

export default class PhotoToolbarUpload extends React.Component {
    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        //If they've already uploaded to the server, 
        //don't let them clear the photo
        const photoHasUploaded = has(this.props, 'image.s3Uri', false);
        const photoHasBase64 = has(this.props, 'image.base64', false);

        return (
            <div className='w-100 p-2'>
                <div className='row mx-auto'>
                    <div className='col-8'>

                    </div>
                    <div className='col-4'>
                        <Upload loading={this.props.loading} 
                            hideClear={photoHasUploaded || !photoHasBase64}
                            hideUpload={photoHasUploaded || photoHasBase64}
                            clearUpload={this.props.clearUpload}
                            openUpload={this.props.openUpload} />
                    </div>
                </div>
            </div>
        );
    }
}
