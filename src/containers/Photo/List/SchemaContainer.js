import { compose, withApollo } from 'react-apollo';

import { LIST_PHOTO_POSTS } from 'api/Photo/List/Query';
import { HYPE_PHOTO_POST } from 'api/Photo/Mutation';
//LIST_PHOTO_POST, DELETE_PHOTO_POST
export default compose(withApollo, HYPE_PHOTO_POST, LIST_PHOTO_POSTS);
