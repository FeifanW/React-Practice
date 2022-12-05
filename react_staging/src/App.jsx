import React, {Component} from 'react';
// import {NavLink, Route} from 'react-router-dom'
import { Button } from "antd";
// import 'antd/dist/antd.css'
// import Home from './components/Home'
// import About from './components/About'
// import MyNavLink from './components/MyNavLink'

class App extends Component {


    //
    // updateAppState = (stateObj) => {
    //     this.setState(stateObj)
    // }

    render() {
        // const {users} = this.state
        return (
            <div className="container">
                HELLO WORLD
                <Button type="primary">Primary Button</Button>
            </div>
        );
    }
}

export default App;