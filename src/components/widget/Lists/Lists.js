import React, { Component } from 'react';
import ListItem from './ListItem';
/**
 * header: [
 * {
 *  field:'name_of_field',
 *  label: 'Heder name',
 *  inputType : 'input'
 * }
 * ]
 */
class Lists extends Component {
    constructor(props){
        super(props);
        this.state ={
            header: this.props.header ? this.props.header : [],
            data: this.props.data ? this.props.data : []
        }
    }

    render() {
        return (
            <div className='list_items'>
                <table class="table">
                    <thead>
                        <tr>
                            {
                                this.state.header.map( (header,key) => {
                                    return <th key={key}><span>{header.label}</span></th>
                                })
                            }
                        </tr>
                        <tbody>
                            {
                                this.state.data.map( (dataItem,key) => {
                                    return <ListItem header={this.state.header} dataItem ={dataItem} key={key} />
                                })
                            }
                        </tbody>
                    </thead>
                </table>
            </div>
        );
    }
}

export default Lists;