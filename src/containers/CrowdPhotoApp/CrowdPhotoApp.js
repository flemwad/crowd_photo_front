import React from 'react';

import PhotoPost from '../PhotoPost/PhotoPost';
import PageLayout from 'utils/components/hocs/PageLayout/PageLayout';

const PhotoPostPageLayout = PageLayout(PhotoPost);

//TODO: So much fun to go: React Router 4, Landing Page, Nav bar, etc... 
class CrowdPhotoApp extends React.Component {
    render() {
        const id = 1;
        const NewPhotoPageLayout = () => <PhotoPostPageLayout new={true} />
        const PhotoPageLayout = () => <PhotoPostPageLayout new={false} queryId={id} />

        return (id == null) ? <NewPhotoPageLayout /> : <PhotoPageLayout />;
    }
}

export default CrowdPhotoApp;