import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createIncrementAction} from '../../redux/count_action'

class Test extends Component {
    add = ()=>{
        // 通知redux加1
        this.props.jiafa(1)
    }
    render() {
        return (
            <div>
                <h2>当前求和为：{this.props.he}</h2>
                <button onClick={this.add}>点我加1</button>
            </div>
        );
    }
}

export default connect(
    state => ({he:state}), // 映射状态
    {jiafa:createIncrementAction}  // 映射操作状态的方法
);