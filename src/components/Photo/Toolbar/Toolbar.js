import React from 'react';

import Upload from './Upload/Upload';

export default class PhotoToolbarUpload extends React.Component {
    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    render() {
        return (
            <div className='w-100 p-2'>
                <div className='row mx-auto'>
                    <div className='col-8'>

                    </div>
                    <div className='col-4'>
                        <Upload 
                            loading={this.props.loading} 
                            hideClear={true}
                            hideUpload={this.props.hideUpload}
                            clearUpload={this.props.clearUpload}
                            openUpload={this.props.openUpload} />
                    </div>
                </div>
            </div>
        );
    }
}
