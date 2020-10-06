import React from 'react';
import { AppContext } from '../App/AppProvider';
import './ThemeToggle.css';

export default function ThemeToggle() {
    return (
        <AppContext.Consumer>
            {({ changeTheme, theme }) => (
                <div>
                    <div className='theme-title'>Theme Toggle</div>
                    <label className='switch'>
                        <input
                            type='checkbox'
                            onClick={changeTheme}
                            defaultChecked={theme === 'dark'}
                        />
                        <span className='slider'></span>
                    </label>
                </div>
            )}
        </AppContext.Consumer>
    );
}
