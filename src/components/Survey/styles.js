import styled from 'styled-components';

const BaseCircleDiv = styled.div`
    border-radius: 50%;

    width: 85px;
    height: 85px;

    background: #42b9f4;

    animation-name: grow, shrink;
    animation-duration: 1000ms, 1000ms;
    animation-delay: 0ms, 1000ms;
    animation-iteration-count: 1, 1;

    @keyframes grow {
        from {
            transform:scale(1);
        }
        to {
            transform:scale(1.2);
        }
    }

    @keyframes shrink {
        from {
            transform:scale(1.2);
        }
        to {
            transform:scale(1);
        }
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

export const StyledFirstDiv = styled(BaseCircleDiv)`
`;

export const StyledMiddleDiv = styled(BaseCircleDiv)`
`;

export const StyledLastDiv = styled(BaseCircleDiv)`
`;

export const StyledSelectedDiv = styled(BaseCircleDiv)`
    border: 2px solid blue;
`;

export const StyledLineConnector = styled.line`
    stroke: #42b9f4;
    stroke-width: 15; 
`;
