import React from 'react';

export default (ContainerComponent) => {
    return class extends React.Component {
        render = () => (
            <div className='w-100 d-block'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2'>
                            <ContainerComponent {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};