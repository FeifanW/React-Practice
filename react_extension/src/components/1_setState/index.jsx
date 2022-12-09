import React, {Component} from 'react';

class Demo extends Component {
    state = {count:0}
    add = () => {
        // 1.获取原来的count值
        // const {count} = this.state
        // 2.更新状态
        // 对象式
        // this.setState({count:count+1},()=>{
        //     console.log(this.state.count)
        // })
        // 函数式
        this.setState((state,props) => {
            return {count:state.count+1}
        })
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
                <button onClick={this.add}>点我+1</button>
            </div>
        );
    }
}

export default Demo;