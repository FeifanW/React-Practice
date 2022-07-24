import React, {Component} from 'react';
import Search from "./components/Search";
import List from "./components/List";

class App extends Component {

    state = {  // 初始化状态，users初始值为数组
        users:[],
        isFirst:true,   // 是否是第一次打开页面
        isLoading:false,   // 是否处于加载中
        err:'',    // 存储错误信息
    }

    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }

    render() {
        const {users} = this.state
        return (
            <div className="container">
                <Search updateAppState = {this.updateAppState}/>
                <List {...this.state}/>
            </div>
        );
    }
}

export default App;