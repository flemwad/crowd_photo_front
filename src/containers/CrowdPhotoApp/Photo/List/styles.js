import styled from 'styled-components';

export const CardDiv = styled.div`
    width: 400px;
`

export const ThumbnailDiv = styled.div.attrs({
    //define dynamic props
    'background-image': props => props.imageSrc
})`
    width: 100%;
    min-height: 200px;
    max-height: 400px;

    overflow: hidden;
    pointer-events: none;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;

    //Use the dynamic props
    background-image: ${props => `url('${props.imageSrc}')`};
`;
