import React, {Component} from 'react';

// 创建一个用于保护用户名的上下文
const MyContext = React.createContext()
const {Provider,Consumer} = MyContext
class A extends Component {

    state = {username:'tom'}
    render() {
        const {username} = this.state
        return (
            <div className='parent'>
                <h3>我是A组件</h3>
                <h4>我的用户名是：{this.state.username}</h4>
                <Provider value={username}>
                    <B/>
                </Provider>
            </div>
        );
    }
}

class B extends Component {
    render() {
        return (
            <div className='child'>
                <h3>我是B组件</h3>
                <h4>我从A组件接收到的用户名：{this.props.username}</h4>
                <C/>
            </div>
        );
    }
}

// 类式组件
// class C extends Component {
//     static contextType = MyContext   // 用的地方必须声明接收一下
//     render() {
//         console.log('this.context',this.context)   // 在这里接收provider传过来的信息
//         return (
//             <div className='grand'>
//                 <h3>我是C组件</h3>
//                 <h4>我从A组件接收到的用户名：{this.context}</h4>
//             </div>
//         );
//     }
// }
// 函数组件
function C(){
    return (
        <div className="grand">
            <h3>我是C组件</h3>
            <h3>我是A组件接收到的用户名</h3>
            <Consumer>
                {
                    value => {
                        return `${value}`
                    }
                }
            </Consumer>
        </div>
    )
}


export default A;