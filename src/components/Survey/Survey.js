import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { set, has } from 'lodash';

import {
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
        this.drawSvg = this.drawSvg.bind(this);

        this.svgRef = React.createRef();

        this.updateAnswer = this.updateAnswer.bind(this);
        this.drawLines = this.drawLines.bind(this);
        this.drawCircles = this.drawCircles.bind(this);
        this.surveyRendered = this.surveyRendered.bind(this);

        this.circleRefs = [];
        this.lineRefs = [];

        for (let i = 0; i < props.answers.length; i++) {
            const pos = i + 1;
            //Create a ref for every answer node
            this[`answer${pos}El`] = React.createRef();
            this.circleRefs.push(this[`answer${pos}El`]);

            //And a ref for every line
            if (i < props.answers.length - 1) {
                this[`line${pos}El`] = React.createRef();
                this.lineRefs.push(this[`line${pos}El`]);
            }
        }
    }

    componentDidMount() { this.drawSvg(); }

    componentDidUpdate(prevProps, prevState, snapshot) { this.drawSvg(); }

    //TODO: Redux
    updateAnswer = (event, index) => {
        event.preventDefault();
        this.props.changeAnswer(index);
    }

    drawSvg() {
        this.drawCircles();
        this.drawLines();
    }

    //TODO: Fix resizing and this not being accurate
    //This might help https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    drawLines() {
        const svgClientRect = this.svgRef.current.getBoundingClientRect();

        for (let i = 0; i < this.circleRefs.length - 1; i++) {
            const currCircleRect = this.circleRefs[i].current.getBoundingClientRect();
            const nextCircleRect = this.circleRefs[i + 1].current.getBoundingClientRect();

            //Get the relative position of the svg element so we can accurately place circles
            //needed mostly because the SVG doesn't fill the width of the window
            let relCurrRect = {};
            relCurrRect.top = currCircleRect.top - svgClientRect.top;
            relCurrRect.right = currCircleRect.right - svgClientRect.right;
            relCurrRect.bottom = currCircleRect.bottom - svgClientRect.bottom;
            relCurrRect.left = currCircleRect.left - svgClientRect.left;


            let relNextRect = {};
            relNextRect.top = nextCircleRect.top - svgClientRect.top;
            relNextRect.right = nextCircleRect.right - svgClientRect.right;
            relNextRect.bottom = nextCircleRect.bottom - svgClientRect.bottom;
            relNextRect.left = nextCircleRect.left - svgClientRect.left;

            let currLine = this.lineRefs[i].current;
            //Note we extend the x-axis a bit in both directions to get line behind answer divs
            currLine.setAttribute('x1', (relCurrRect.left + currCircleRect.width));
            currLine.setAttribute('y1', relCurrRect.top + (currCircleRect.height / 2));

            //Note we extend the x-axis a bit in both directions to get line behind answer divs
            currLine.setAttribute('x2', relNextRect.left);
            currLine.setAttribute('y2', relNextRect.top + (nextCircleRect.height / 2));
        }
    }

    drawCircles() {
        const svgClientRect = this.svgRef.current.getBoundingClientRect();

        //To draw evenly across the svg width & height
        const svgEvenWidth = (svgClientRect.width / this.circleRefs.length);
        const svgOffestWidth = (svgClientRect.width / this.circleRefs.length) / 2;

        for (let i = 0; i < this.circleRefs.length; i++) {
            const currCircleEl = this.circleRefs[i].current;

            currCircleEl.setAttribute('cx', (i * svgEvenWidth) + svgOffestWidth);
            currCircleEl.setAttribute('cy', svgClientRect.top + (svgClientRect.height / 2));
        }
    }

    surveyRendered() {
        if (!this.circleRefs.length || !this.lineRefs.length) return false;
        return this.circleRefs[0].current && this.lineRefs[0].current;
    }

    AnswerDots() {
        const answersLength = this.props.answers ? this.props.answers.length : 0;

        return this.props.answers.map((answer, i) => {
            const currInnerRef = this[`answer${i + 1}El`];
            if (answer.selected) {
                return (
                    <StyledSelectedCircle key={i}
                        innerRef={currInnerRef}
                        onClick={(e) => this.updateAnswer(e, i)}>
                    </StyledSelectedCircle>
                );
            } else if (i === 0) {
                return (
                    <StyledFirstCircle key={i}
                        innerRef={currInnerRef}
                        onClick={(e) => this.updateAnswer(e, i)}>
                    </StyledFirstCircle>
                );
            } else if (i < answersLength - 1) {
                return (
                    <StyledMiddleCircle key={i}
                        innerRef={currInnerRef}
                        onClick={(e) => this.updateAnswer(e, i)}>
                    </StyledMiddleCircle>
                );
            } else {
                return (
                    <StyledLastCircle key={i}
                        innerRef={currInnerRef}
                        onClick={(e) => this.updateAnswer(e, i)}>
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
        );
    }
}

Survey.propTypes = {
    answers: PropTypes.array,
    changeAnswer: PropTypes.func
}

export default Survey;