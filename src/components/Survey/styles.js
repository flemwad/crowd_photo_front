import styled from 'styled-components';

const BaseDiv = styled.div`
    border-radius: 50%;

    width: 85px;
    height: 85px;

    background: #42b9f4;

    transition-property: transform;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;

    :hover {        
        transform:scale(1.2);
    }
`;

export const StyledFlexDiv = styled.div`
    display: flex;

    justify-content: space-evenly;

    height: 100%;
    width: 100%;
`;

export const StyledSVG = styled.svg`
    position: absolute;
    width: 100%;
`;

export const StyledFirstDiv = styled(BaseDiv)`
    
`;

export const StyledMiddleDiv = styled(BaseDiv)`
`;

export const StyledLastDiv = styled(BaseDiv)`
`;

export const StyledSelectedDiv = styled(BaseDiv)`
    border: 2px solid blue;
`;

export const StyledLineConnector = styled.line`
    stroke: #42b9f4;
    stroke-width: 15; 
`;
