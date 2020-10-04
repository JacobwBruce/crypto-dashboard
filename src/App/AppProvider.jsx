import React from 'react';

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

    setPage = (page) => this.setState({ page });

    savedSettings() {
        const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) return { page: 'Settings', firstVisit: true };
        return {};
    }

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

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}
