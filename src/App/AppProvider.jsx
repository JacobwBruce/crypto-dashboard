import React from 'react';
import _ from 'lodash';
import cc from 'cryptocompare';
cc.setApiKey('dc7f79f0e7cb6eb2b4d6d8542e5d2845eb3204b6e20ed56d1f86722490714c05');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
        };
    }

    addCoin = (key) => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({ favorites });
        }
    };

    removeCoin = (key) => {
        let favorites = [...this.state.favorites];
        this.setState({ favorites: _.pull(favorites, key) });
    };

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    };

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    };

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter((price) => Object.keys(price).length);
        this.setState({ prices });
    };

    prices = async () => {
        let returnData = [];
        for (let fav of this.state.favorites) {
            try {
                let priceData = await cc.priceFull(fav, 'USD');
                returnData.push(priceData);
            } catch (err) {
                console.error('Fetch price error: ', err);
            }
        }
        return returnData;
    };

    isInFavorites = (key) => _.includes(this.state.favorites, key);

    confirmFavorites = () => {
        this.setState(
            {
                firstVisit: false,
                page: 'Dashboard',
            },
            () => {
                this.fetchPrices();
            }
        );
        localStorage.setItem(
            'cryptoDash',
            JSON.stringify({
                favorites: this.state.favorites,
            })
        );
    };

    savedSettings() {
        const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return { page: 'Settings', firstVisit: true };
        }
        let { favorites } = cryptoDashData;
        return { favorites };
    }

    setPage = (page) => this.setState({ page });

    setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}
