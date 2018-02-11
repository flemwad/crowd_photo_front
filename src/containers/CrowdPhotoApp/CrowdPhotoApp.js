import React from 'react';

import PhotoPost from '../PhotoPost/PhotoPost';
import PageLayout from 'utils/components/hocs/PageLayout/PageLayout';

const PhotoPostPageLayout = PageLayout(PhotoPost);

//TODO: So much fun to go: React Router 4, Landing Page, Nav bar, etc... 
class CrowdPhotoApp extends React.Component {
    render() {
        return <PhotoPostPageLayout queryId={null} />
    }
}

export default CrowdPhotoApp;