import React from 'react';

//import PhotoPost from '../Photo/Post/PhotoPost';
// import PhotoList from '../Photo/List/PhotoList';
import UserDetail from '../User/Detail/UserDetail';

import PageLayout from 'utils/components/hocs/PageLayout/PageLayout';

//const PhotoPostPageLayout = PageLayout(PhotoPost);
// const PhotoListPageLayout = PageLayout(PhotoList);
const UserDetailPageLayout = PageLayout(UserDetail);

//TODO: So much fun to go: React Router 4, Landing Page, Nav bar, etc... 
class CrowdPhotoApp extends React.Component {
    render() {
        // return <PhotoPostPageLayout queryId={null} />
        // return <PhotoListPageLayout />
        return <UserDetailPageLayout  queryId={'Hy5h5YsAM'} registering={false} />
    }
}

export default CrowdPhotoApp;