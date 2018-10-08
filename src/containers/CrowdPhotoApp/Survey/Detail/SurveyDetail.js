import React from 'react';
import Survey from 'src/components/Survey/Survey';
import update from 'immutability-helper';
import { set, findIndex } from 'lodash';

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
    changeAnswer(i) {
        const unselectIndex = findIndex(this.state.answers, {selected: true});

        let answers = this.state.answers;
        let selected = true;
        
        //If the answer changed we have to unselect the old one
        if (unselectIndex > -1 && i !== unselectIndex) {
            let updateUnselectDef = {};
            set(updateUnselectDef, unselectIndex, {selected: {$set: false}});
            answers = update(this.state.answers, updateUnselectDef)
        } else if (unselectIndex > -1 && i === unselectIndex) {
            //If it was already answered unselect it
            selected = false;
        }

        let updateSelectDef = {};
        set(updateSelectDef, i, {selected: {$set: selected}});
        answers = update(answers, updateSelectDef)
        this.setState({answers});
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
