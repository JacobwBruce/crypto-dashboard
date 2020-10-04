import styled from 'styled-components';
import {
    subtleBoxShadow,
    lightBlueBoxShadow,
    greenBoxShadow,
    redBoxShadow,
    lightBlueBackground,
} from './Styles';

export const Tile = styled.div`
    ${subtleBoxShadow};
    ${lightBlueBackground};
    padding: 10px;
`;

export const SelectableTile = styled(Tile)`
    &:hover {
        cursor: pointer;
        ${greenBoxShadow};
    }
`;
