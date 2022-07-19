import React, {Component} from 'react';
import Search from "./components/Search";
import List from "./components/List";

class App extends Component {

    state = {users:[]}    // 初始化状态，users初始值为数组

    saveUsers = (users) => {
        this.setState({users})
    }

    render() {
        const {users} = this.state
        return (
            <div className="container">
                <Search saveUsers = {this.saveUsers}/>
                <List users={users}/>
            </div>
        );
    }
}

export default App;