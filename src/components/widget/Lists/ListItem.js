import React, { Component } from 'react';
import Button from '../../Forms/Button';

class ListItem extends Component {
    render() {
        return (
            <tr>
                {
                    this.props.header.map( (headerItem,key) => {
                        return(
                            <td key={key}>
                                <div dangerouslySetInnerHTML={{ __html:this.props.dataItem[headerItem.field] }}></div>
                            </td>
                        )
                    })
                }
                <td className='actions'>
                    <Button label="Delete"/>
                </td>
            </tr>
        );
    }
}

export default ListItem;