import styled from 'styled-components';

export const StyledSVG = styled.svg`
    position: absolute;

    left:0; 
    top:0;
    height:100%;
    width: 100%;
`;

const BaseCircle = styled.circle`
    r: 40;

    fill: #42b9f4;
    stoke: #42b9f4;

    transition-property: transform;
    transition-duration: 1s;
    transform-box: fill-box;
    transform-origin: center center;
    transition-timing-function: ease-in-out;

    :hover {
        transform: scale(1.2);
    }
`;

export const StyledFirstCircle = styled(BaseCircle)`
    
`;

export const StyledMiddleCircle = styled(BaseCircle)`
`;

export const StyledLastCircle = styled(BaseCircle)`
`;

export const StyledSelectedCircle = styled(BaseCircle)`
    stroke: blue;
`;

export const StyledLineConnector = styled.line`
    stroke: #42b9f4;
    stroke-width: 15; 
`;
