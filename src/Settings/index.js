import React from 'react';
import ConfirmButton from './ConfirmButton';
import WelcomeMessage from './WelcomeMessage';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';
import Search from './Search';
import ThemeToggle from './ThemeToggle';

export default function () {
    return (
        <Page name='Settings'>
            <WelcomeMessage />
            <ThemeToggle />
            <CoinGrid topSection />
            <ConfirmButton />
            <Search />
            <CoinGrid />
        </Page>
    )
}
