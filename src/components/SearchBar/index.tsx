import React from 'react';

import './index.css';

interface IProps {
    setSearchTerm: any
}

const SearchBar: React.FC<IProps> = props => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder='Search here...'
                onChange={(e) => props.setSearchTerm(e.target.value)}
            />
            <i className='bx bx-search'></i>
        </div>
    )
}

export default SearchBar;
