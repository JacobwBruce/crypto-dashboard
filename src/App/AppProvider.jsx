import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import cc from 'cryptocompare';
cc.setApiKey('dc7f79f0e7cb6eb2b4d6d8542e5d2845eb3204b6e20ed56d1f86722490714c05');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect,
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
        this.fetchHistorical();
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

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment()
                        .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
                        .valueOf(),
                    ticker.USD,
                ]),
            },
        ];
        this.setState({ historical });
    };

    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment()
                        .subtract({ [this.state.timeInterval]: units })
                        .toDate()
                )
            );
        }
        return Promise.all(promises);
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
        let currentFavorite = this.state.favorites[0];
        this.setState(
            {
                firstVisit: false,
                page: 'Dashboard',
                currentFavorite,
                prices: null,
                historical: null,
            },
            () => {
                this.fetchPrices();
                this.fetchHistorical();
            }
        );
        localStorage.setItem(
            'cryptoDash',
            JSON.stringify({
                favorites: this.state.favorites,
                currentFavorite,
            })
        );
    };

    setCurrentFavorite = (sym) => {
        this.setState({ currentFavorite: sym, historical: null }, this.fetchHistorical);
        localStorage.setItem(
            'cryptoDash',
            JSON.stringify({
                ...JSON.parse(localStorage.getItem('cryptoDash')),
                currentFavorite: sym,
            })
        );
    };

    savedSettings() {
        const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return { page: 'Settings', firstVisit: true };
        }
        let { favorites, currentFavorite } = cryptoDashData;
        return { favorites, currentFavorite };
    }

    setPage = (page) => this.setState({ page });

    setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

    changeChartSelect = (value) => {
        this.setState({ timeInterval: value, historical: null }, this.fetchHistorical);
    };

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}
