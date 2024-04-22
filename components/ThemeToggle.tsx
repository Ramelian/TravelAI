'use client'

import {useState} from 'react';
import {BsMoonFill, BsSunFill} from 'react-icons/bs';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('winter');

    const toggleTheme = () => {
        setTheme(theme === 'winter'? 'dracula' : 'winter');
        document.documentElement.setAttribute('data-theme', theme);
    }
    return (
        <button className='btn btn-sm btn-outline' onClick={toggleTheme}>
            {theme === 'winter'? <BsSunFill /> : <BsMoonFill />}
        </button>
    );
};

export default ThemeToggle;