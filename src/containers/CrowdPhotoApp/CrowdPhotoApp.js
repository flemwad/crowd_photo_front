import React from 'react';

//import PhotoPost from '../Photo/Post/PhotoPost';
import PhotoList from '../Photo/List/PhotoList';

import PageLayout from 'utils/components/hocs/PageLayout/PageLayout';

//const PhotoPostPageLayout = PageLayout(PhotoPost);
const PhotoListPageLayout = PageLayout(PhotoList);

//TODO: So much fun to go: React Router 4, Landing Page, Nav bar, etc... 
class CrowdPhotoApp extends React.Component {
    render() {
        // return <PhotoPostPageLayout queryId={null} />
        return <PhotoListPageLayout />
    }
}

export default CrowdPhotoApp;