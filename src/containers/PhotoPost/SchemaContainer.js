import { compose, withApollo } from 'react-apollo';

import { GET_PHOTO_POST } from 'api/PhotoPost/Query';
import { HYPE_PHOTO_POST, UPSERT_PHOTO_POST } from 'api/PhotoPost/Mutation';

export default compose(withApollo, GET_PHOTO_POST, HYPE_PHOTO_POST, UPSERT_PHOTO_POST);