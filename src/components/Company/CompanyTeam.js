import React, { Component } from 'react';
import AccessLevels from '../AccessLevel/AccessLevels';

class CompanyTeam extends Component {
    render() {
        return (
            <AccessLevels source="company" integrator={this.props.id} />
        );
    }
}

export default CompanyTeam;