import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { set } from 'lodash';

import {
    StyledOuterDiv,
    StyledFlexDiv,
    StyledFirstDiv,
    StyledMiddleDiv,
    StyledLastDiv,
    StyledSelectedDiv,
    StyledLineConnector,
    StyledSVG
} from './styles';

//import SpinnyLoadingText from '../Loading/SpinnyLoadingText';
class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.updateAnswer = this.updateAnswer.bind(this);

        this.AnswerDots = this.AnswerDots.bind(this);
        this.AnswerLines = this.AnswerLines.bind(this);
        this.connectTheDots = this.connectTheDots.bind(this);

        this.svgRef = React.createRef();

        for (let i = 0; i < props.answers.length; i++) {
            const pos = i + 1;
            //Create a ref for every answer node
            this[`answer${pos}El`] = React.createRef();
            //And a ref for every line
            if (i < props.answers.length - 1) this[`line${pos}El`] = React.createRef();
        }
    }

    componentDidMount() {
        this.connectTheDots();
    }

    //TODO: Redux
    updateAnswer = (event) => {

    }

    connectTheDots() {
        let dotRefs = [];
        let lineRefs = [];
        for (let i = 0; i < this.props.answers.length; i++) {
            const pos = i + 1;
            dotRefs.push(this[`answer${pos}El`].current.getBoundingClientRect());
            if (i < this.props.answers.length - 1) lineRefs.push(this[`line${pos}El`].current);
        }
        
        const svgRect = this.svgRef.current.getBoundingClientRect();
        for (let i = 0; i < dotRefs.length - 1; i++) {
            const currRect = dotRefs[i];
            const nextRect = dotRefs[i + 1];

            //TODO: Fix resizing and this not being accurate
            //This might help https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

            //Get the relative position of the answer dots
            //needed because the SVG doesn't fill the width of the window
            let relCurrRect = {};
            relCurrRect.top = currRect.top - svgRect.top,
            relCurrRect.right = currRect.right - svgRect.right,
            relCurrRect.bottom = currRect.bottom - svgRect.bottom,
            relCurrRect.left = currRect.left - svgRect.left;

            let relNextRect = {};
            relNextRect.top = nextRect.top - svgRect.top,
            relNextRect.right = nextRect.right - svgRect.right,
            relNextRect.bottom = nextRect.bottom - svgRect.bottom,
            relNextRect.left = nextRect.left - svgRect.left;

            let currLine = lineRefs[i];
            currLine.setAttribute('x1', (relCurrRect.left + currRect.width) - 5);
            currLine.setAttribute('y1', relCurrRect.top + (currRect.height / 2));
            currLine.setAttribute('x2', relNextRect.left + 5);
            currLine.setAttribute('y2', relNextRect.top + (nextRect.height / 2));
        }
    }

    AnswerDots() {
        const answersLength = this.props.answers ? this.props.answers.length : 0;

        return this.props.answers.map((answer, i) => {
            const currInnerRef = this[`answer${i + 1}El`];
            if (i === 0) {
                return (
                    <StyledFirstDiv key={i} innerRef={currInnerRef}>
                    </StyledFirstDiv>
                );
            } else if (i < answersLength - 1) {
                return (
                    <StyledMiddleDiv key={i} innerRef={currInnerRef}>
                    </StyledMiddleDiv>
                );
            } else {
                return (
                    <StyledLastDiv key={i} innerRef={currInnerRef}>
                    </StyledLastDiv>
                );
            }
        });
    }

    AnswerLines() {
        const answersLength = this.props.answers.length;

        return this.props.answers.map((answer, i) => {
            const currInnerRef = this[`line${i + 1}El`];
            if (i <= answersLength - 1) {
                return (<StyledLineConnector key={i} innerRef={currInnerRef}></StyledLineConnector>);
            }
        });
    }

    render() {
        const AnswerDots = this.AnswerDots;
        const AnswerLines = this.AnswerLines;

        return (
            <div className="container">
                <StyledSVG innerRef={this.svgRef}>
                    <AnswerLines />
                </StyledSVG>
                <StyledFlexDiv>
                    <AnswerDots />
                </StyledFlexDiv>
            </div>
            // <div>
            //     {this.state.answers ? JSON.stringify(this.state.answers) : []}
            // </div>
        );
    }
}

Survey.propTypes = {
    answers: PropTypes.array,
    changeAnswer: PropTypes.func
}

export default Survey;