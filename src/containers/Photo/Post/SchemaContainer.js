import { compose, withApollo } from 'react-apollo';

import { GET_PHOTO_POST } from 'api/Photo/Post/Query';
import { UPSERT_PHOTO_POST } from 'api/Photo/Post/Mutation';
import { HYPE_PHOTO_POST} from 'api/Photo/Mutation';

export default compose(withApollo, GET_PHOTO_POST, HYPE_PHOTO_POST, UPSERT_PHOTO_POST);
