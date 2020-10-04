import React from 'react';
import cc from 'cryptocompare';
cc.setApiKey('dc7f79f0e7cb6eb2b4d6d8542e5d2845eb3204b6e20ed56d1f86722490714c05');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites,
        };
    }

    componentDidMount = () => {
        this.fetchCoins();
    };

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    };

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'Dashboard',
        });
        localStorage.setItem(
            'cryptoDash',
            JSON.stringify({
                test: 'hello',
            })
        );
    };

    savedSettings() {
        const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return { page: 'Settings', firstVisit: true };
        }
        return {};
    }

    setPage = (page) => this.setState({ page });

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}
