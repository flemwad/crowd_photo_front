import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const LoadingHeader = styled.h3`
    font-size: 1.5em;
    display: inline-block;
    animation: ${rotate360} 5s linear infinite;
`;

export default class SpinnyLoadingText extends React.Component {
    render() {
        return (
            <div className='h-100 w-100 text-center'>
                <LoadingHeader>
                    Loading...
                </LoadingHeader>
            </div>
        );
    }
}