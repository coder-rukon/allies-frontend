import React, { Component } from 'react';

class SearchBox extends Component {
    render() {
        return (
            <div className='search_box_section'>
                <div className='sbox_input_wraper'>
                    <input style={{backgroundImage:"url(/images/search.png)"}} className="sbox_input form-control" placeholder='Search company, property, or deal'/>
                </div>
            </div>
        );
    }
}

export default SearchBox;