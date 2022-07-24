import React, {Component} from 'react';
import Search from "./components/Search";
import List from "./components/List";

class App extends Component {



    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }

    render() {
        // const {users} = this.state
        return (
            <div className="container">
                <Search/>
                <List/>
            </div>
        );
    }
}

export default App;