import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import Photo from '../../components/Photo/Photo';
import { GET_PHOTO } from '../../api/Photo/Query';

class PhotoPost extends Component {
    render() {
        const { loading, photo } = this.props.data;

        return (
            <Photo loading={loading} photo={photo} />
        );
    }
}

export default graphql(GET_PHOTO(1))(PhotoPost);