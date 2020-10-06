import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';
import styled from 'styled-components';
import PriceChart from './PriceChart';

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-top: 20px;
    grid-gap: 15px;
`;

export default function () {
    return (
        <Page name='Dashboard'>
            <PriceGrid />
            <ChartGrid>
                <CoinSpotlight />
                <PriceChart />
            </ChartGrid>
        </Page>
    )
}
