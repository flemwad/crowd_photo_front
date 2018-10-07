import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { set } from 'lodash';

import {
    StyledContainerDiv,
    StyledFirstCircle,
    StyledMiddleCircle,
    StyledLastCircle,
    StyledSelectedCircle,
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
        let circleRefs = [];
        let lineRefs = [];
        for (let i = 0; i < this.props.answers.length; i++) {
            const pos = i + 1;
            circleRefs.push(this[`answer${pos}El`].current);
            if (i < this.props.answers.length - 1) lineRefs.push(this[`line${pos}El`].current);
        }
        
        const svgClientRect = this.svgRef.current.getBoundingClientRect();
        const svgEvenWidth = (svgClientRect.width / circleRefs.length);
        const svgOffestWidth = (svgClientRect.width / circleRefs.length) / 2;
        for (let i = 0; i < circleRefs.length; i++) {
            const currCircleEl = circleRefs[i];
            
            currCircleEl.setAttribute('cx', (i * svgEvenWidth) + svgOffestWidth);
            currCircleEl.setAttribute('cy', svgClientRect.top + (svgClientRect.height / 2));
        }
        
        for (let i = 0; i < circleRefs.length - 1; i++) {
            const currCircleRect = circleRefs[i].getBoundingClientRect();
            const nextCircleRect = circleRefs[i + 1].getBoundingClientRect();

            //TODO: Fix resizing and this not being accurate
            //This might help https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

            //Get the relative position of the svg element so we can accurately place circles
            //needed mostly because the SVG doesn't fill the width of the window
            let relCurrRect = {};
            relCurrRect.top = currCircleRect.top - svgClientRect.top,
            relCurrRect.right = currCircleRect.right - svgClientRect.right,
            relCurrRect.bottom = currCircleRect.bottom - svgClientRect.bottom,
            relCurrRect.left = currCircleRect.left - svgClientRect.left;
            

            let relNextRect = {};
            relNextRect.top = nextCircleRect.top - svgClientRect.top,
            relNextRect.right = nextCircleRect.right - svgClientRect.right,
            relNextRect.bottom = nextCircleRect.bottom - svgClientRect.bottom,
            relNextRect.left = nextCircleRect.left - svgClientRect.left;

            let currLine = lineRefs[i];
            //Note we extend the x-axis a bit in both directions to get line behind answer divs
            currLine.setAttribute('x1', (relCurrRect.left + currCircleRect.width) - 5);
            currLine.setAttribute('y1', relCurrRect.top + (currCircleRect.height / 2));

            //Note we extend the x-axis a bit in both directions to get line behind answer divs
            currLine.setAttribute('x2', relNextRect.left + 5);
            currLine.setAttribute('y2', relNextRect.top + (nextCircleRect.height / 2));
        }
    }

    AnswerDots() {
        const answersLength = this.props.answers ? this.props.answers.length : 0;

        return this.props.answers.map((answer, i) => {
            const currInnerRef = this[`answer${i + 1}El`];
            if (i === 0) {
                return (
                    <StyledFirstCircle key={i} innerRef={currInnerRef}>
                    </StyledFirstCircle>
                );
            } else if (i < answersLength - 1) {
                return (
                    <StyledMiddleCircle key={i} innerRef={currInnerRef}>
                    </StyledMiddleCircle>
                );
            } else {
                return (
                    <StyledLastCircle key={i} innerRef={currInnerRef}>
                    </StyledLastCircle>
                );
            }
        });
    }

    AnswerLines() {
        return this.props.answers.map((answer, i) => {
            const currInnerRef = this[`line${i + 1}El`];
            if (i <= this.props.answers.length - 1) {
                return (<StyledLineConnector key={i} innerRef={currInnerRef}></StyledLineConnector>);
            }
        });
    }

    render() {
        const AnswerDots = this.AnswerDots;
        const AnswerLines = this.AnswerLines;

        return (
            <StyledSVG innerRef={this.svgRef}>
                <AnswerDots />
                <AnswerLines />
            </StyledSVG>
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