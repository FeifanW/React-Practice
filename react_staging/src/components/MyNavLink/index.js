import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'


class MyNavLink extends Component {
    render() {
        const {title} = this.props
        return (
            <NavLink activeClassName="hello" className="list-group-item" {...this.props}>{title}</NavLink>
        );
    }
}

export default MyNavLink;