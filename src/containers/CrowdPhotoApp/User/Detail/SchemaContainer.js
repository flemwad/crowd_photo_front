import { compose, withApollo } from 'react-apollo';

import { GET_USER } from 'api/User/Detail/Query';
import { LIST_USERS } from 'api/User/List/Query';
import { UPSERT_USER } from 'api/User/Detail/Mutation';

export default compose(withApollo, GET_USER, LIST_USERS, UPSERT_USER);
