import React from 'react';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';
import { Tile } from '../Shared/Tile';
import styled from 'styled-components';

const SpotlightName = styled.h2`
    text-align: center;
`;

export default function CoinSpotlight() {
    return (
        <AppContext.Consumer>
            {({ currentFavorite, coinList }) => (
                <Tile>
                    <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]} />
                </Tile>
            )}
        </AppContext.Consumer>
    );
}
