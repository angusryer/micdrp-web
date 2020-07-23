import React from 'react';
import { Nav } from '../';

function Dashboard(props) {

    console.log(props);

    return (
        <div>
            <Nav user={props.user} />
            Welcome, {props.name}
        </div>
    )
}

export default Dashboard
