import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class RatingQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.ratePhoto = this.ratePhoto.bind(this);
    }

    ratePhoto = (event) => this.props.updatePhotoPost(event);

    //TODO: Make surrounding custom CSS tooltip cmp for tooltip info
    //Note that multiple: false means only one photo can be uploaded at a time
    render() {
        const questionId = 'meta.' + this.props.type.toLowerCase() + 'Rating';

        return (
            <Input id={questionId}
                defaultValue={this.props.value}
                placeholder="in your opinion, how difficult is it to edit this photo?"
                type="number"
                min="1"
                max="10"
                onChange={(event) => this.ratePhoto(event)} />
        );
    }
}

RatingQuestion.propTypes = {
    loading: PropTypes.bool,
    value: PropTypes.number,
    type: PropTypes.string,
    updatePhotoPost: PropTypes.func
}

export default RatingQuestion;