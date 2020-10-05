import React from 'react';
import styled, { css } from 'styled-components';
import { fontSize3, fontSizeBig } from '../Shared/Styles';
import { SelectableTile } from '../Shared/Tile';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';

const JustifyRight = styled.div`
    justify-self: right;
`;

const JustifyLeft = styled.div`
    justify-self: left;
`;

const TickerPrice = styled.div`
    ${fontSizeBig};
`;

const ChangePct = styled.div`
    color: green;
    ${(props) =>
        props.red &&
        css`
            color: red;
        `}
`;

const numberFormat = (number) => {
    return +(number + '').slice(0, 7);
};

const PriceTyleStyled = styled(SelectableTile)`
    ${(props) =>
        props.compact &&
        css`
            display: grid;
            ${fontSize3};
            grid-gap: 5px;
            grid-template-columns: repeat(3, 1fr);
            justify-items: right;
        `}
`;

function ChangePercentage({ data }) {
    return (
        <JustifyRight>
            <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}
            </ChangePct>
        </JustifyRight>
    );
}

function PriceTile({ sym, data }) {
    return (
        <PriceTyleStyled>
            <CoinHeaderGridStyled>
                <div>{sym}</div>
                <ChangePercentage data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
        </PriceTyleStyled>
    );
}

function PriceTileCompact({ sym, data }) {
    return (
        <PriceTyleStyled compact>
            <JustifyLeft>{sym}</JustifyLeft>
            <ChangePercentage data={data} />
            <div>${numberFormat(data.PRICE)}</div>
        </PriceTyleStyled>
    );
}

export default function ({ price, index }) {
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile : PriceTileCompact;
    return (
        <TileClass sym={sym} data={data}>
            {sym} {data.PRICE}
        </TileClass>
    );
}
