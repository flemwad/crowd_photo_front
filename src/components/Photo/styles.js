import styled from 'styled-components';

export const PhotoContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;

    min-height 500px;
    max-height: 768px;

    border-width: 0.3em;
    border-style: solid;
    border-radius: 3px;
`;

export const PhotoDiv = styled.div.attrs({
    //define dynamic props
    'background-image': props => props.imageSrc
})`
    width: 100%;
    min-height 500px;
    max-height: 768px;

    overflow: hidden;
    pointer-events: none;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;

    //Use the dynamic props
    background-image: ${props => `url('${props.imageSrc}')`};
`;
