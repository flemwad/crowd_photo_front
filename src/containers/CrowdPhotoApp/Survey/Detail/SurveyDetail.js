import React from 'react';
import Survey from 'src/components/Survey/Survey';

import { SurveyContainer } from './styles';

const devAnswers = [
    {text: 'No Idea', value: 0, selected: false},
    {text: 'Somewhat Certain', value: 1, selected: false},
    {text: 'Certain', value: 2, selected: false},
    {text: 'Very Certain', value: 3, selected: false},
    {text: 'Undeniable', value: 4, selected: false}
];

class SurveyDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { answers: devAnswers };

        this.changeAnswer = this.changeAnswer.bind(this);
    }

    //TODO: Validation!
    changeAnswer() {

    }

    render() {
        return (
            <SurveyContainer>
                <Survey answers={this.state.answers} changeAnswer={this.changeAnswer} />
            </SurveyContainer>
        );
    }
}

export default SurveyDetail;
