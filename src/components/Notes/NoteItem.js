import React, { Component } from 'react';

class NoteItem extends Component {
    render() {
        let note = this.props.note;
        return (
            <div className='note_item_wraper'>
                <div className='note_text'>{note.note_details}</div>
            </div>
        );
    }
}

export default NoteItem;