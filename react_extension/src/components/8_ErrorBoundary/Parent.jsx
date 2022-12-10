import React, {Component} from 'react';
import Child from './Child'

class Parent extends Component {
    state = {
        hasError:''   // 用于标识子组件是否产生错误
    }
    static getDerivedStateFromError(error){   // Parent的任何子组件出错，都会调用这个钩子
        console.log(error)
        return {hasError:error}
    }

    componentDidCatch(error, errorInfo) {
        console.log('渲染组件时出错')   // 一般在这个钩子里面统计错误，发送给后台
    }

    render() {
        return (
            <div>
                <h2>我是Parent组件</h2>
                {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
            </div>
        );
    }
}

export default Parent;