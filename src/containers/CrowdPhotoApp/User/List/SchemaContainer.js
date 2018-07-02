import { compose, withApollo } from 'react-apollo';

import { LIST_USERS } from 'api/User/List/Query';

export default compose(withApollo, LIST_USERS);
