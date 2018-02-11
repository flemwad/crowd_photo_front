import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';

import { StyledFA, StyledSpan, StyledButton } from './styles';

class PhotoToolbarMeta extends React.Component {
    constructor(props) {
        super(props);

        this.hypePhoto = this.hypePhoto.bind(this);
    }

    hypePhoto = () => this.props.hypePhoto();

    render() {
        const hype = get(this.props, 'meta.hype') || 1;
        const userRating = get(this.props, 'meta.userRating') || '--';
        const editorRating = get(this.props, 'meta.editorRating') || '--';

        return (
            <div className='d-flex justify-content-around'>
                <div className="p-2">
                    <StyledButton disabled={this.props.hypeDisabled} 
                        title="Hype" 
                        onClick={this.hypePhoto}>

                        <FA name="chevron-up" />
                    </StyledButton>
                    <StyledSpan>{hype}</StyledSpan>
                </div>
                <div className="p-2">
                    <StyledFA name="user" title="User Rating" />
                    <StyledSpan>{userRating}</StyledSpan>
                </div>
                <div className="p-2">
                    <StyledFA name="paint-brush" title="Editor Rating" />
                    <StyledSpan>{editorRating}</StyledSpan>
                </div>
            </div>
        )
    }
}

PhotoToolbarMeta.propTypes = {
    meta: PropTypes.object,
    hypeDisabled: PropTypes.bool,
    hypePhoto: PropTypes.func
}

export default PhotoToolbarMeta;