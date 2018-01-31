import { compose, withApollo } from 'react-apollo';

import { GET_PHOTO } from '../../api/Photo/Query';
import { HYPE_PHOTO, UPSERT_PHOTO, UPLOAD_IMAGE } from '../../api/Photo/Mutation';

export default compose (
    withApollo,
    GET_PHOTO, 
    HYPE_PHOTO,
    UPSERT_PHOTO,
    UPLOAD_IMAGE
);