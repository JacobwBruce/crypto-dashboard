import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DisabledTile, DeletableTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

export default function CoinTile({ coinKey, topSection }) {
    return (
        <AppContext.Consumer>
            {({ coinList }) => {
                const coin = coinList[coinKey];
                const TileClass = topSection ? DeletableTile : SelectableTile;
                return (
                    <TileClass>
                        <CoinHeaderGrid
                            topSection={topSection}
                            name={coin.CoinName}
                            symbol={coin.Symbol}
                        />
                        <CoinImage coin={coin} />
                    </TileClass>
                );
            }}
        </AppContext.Consumer>
    );
}
