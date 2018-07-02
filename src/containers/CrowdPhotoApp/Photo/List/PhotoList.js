import React from 'react';
import SchemaContainer from './SchemaContainer';

import { ThumbnailDiv, CardDiv } from './styles';
import SpinnyLoadingText from 'components/Loading/SpinnyLoadingText';

class PhotoList extends React.Component {
    constructor(props) {
        super(props);

        
        this.state = {};

        this.createPhotoCardList = this.createPhotoCardList.bind(this);
    }

    createPhotoCardList = (photoList) => {
        return photoList.map((item) => {
            return (
                <CardDiv key={item.id} className='card'>
                    <ThumbnailDiv className='img-fluid card-img-top' imageSrc={item.image.s3Uri} />
                    <div className="card-body">
                        <h4 className="card-title">{item.postName}</h4>
                        <p className="card-text">{item.meta.category}</p>
                        <span>{item.meta.hype}</span>
                        {/* <a href="#" class="btn btn-primary">See Profile</a> */}
                    </div>
                </CardDiv>
            )
        })
    }

    render() {
        const loading = this.props.photoListQuery.loading;

        let photoList = [];
        if (!loading) photoList = this.props.photoListQuery.photoPosts;

        const listItems = this.createPhotoCardList(photoList);

        return loading ? (<SpinnyLoadingText />) :
        (
            <div>
                {listItems}

                {JSON.stringify(this.props.photoListQuery.photoPosts)}
            </div>
        );
    }
}

PhotoList.propTypes = {}

//In the future this will be abstracted to Detail HOC
//SchemaContainer will compose apollo-client and auto resolve props and mutations onto the component
export default SchemaContainer(PhotoList);
