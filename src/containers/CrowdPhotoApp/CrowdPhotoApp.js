import React from 'react';

//TODO: React router 4: https://github.com/ReactTraining/react-router

//import PhotoPost from './Photo/Post/PhotoPost';
// import PhotoList from './Photo/List/PhotoList';
//import UserDetail from './User/Detail/UserDetail';
import UserList from './User/List/UserList';

import PageLayout from 'utils/components/hocs/PageLayout/PageLayout';

//const PhotoPostPageLayout = PageLayout(PhotoPost);
// const PhotoListPageLayout = PageLayout(PhotoList);
//const UserDetailPageLayout = PageLayout(UserDetail);
const UserListPageLayout = PageLayout(UserList);

//TODO: So much fun to go: Landing Page, Nav bar, etc... 
class CrowdPhotoApp extends React.Component {
    render() {
        // return <PhotoPostPageLayout queryId={null} />
        // return <PhotoListPageLayout />
        // return <UserDetailPageLayout  queryId={null} registering={false} />
        return <UserListPageLayout />
    }
}

export default CrowdPhotoApp;