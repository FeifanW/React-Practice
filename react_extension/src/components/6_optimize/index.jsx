import React, {Component, PureComponent} from 'react';
// import {logDOM} from "@testing-library/react";

class Parent extends PureComponent {
// class Parent extends Component {
    state = {carName:'雷克萨斯',stus:['小张','小李','小王']}

    addStu = ()=>{
        const {stus} = this.state
        // stus.unshift('小刘')
        // this.setState({stus})  // 不能这么写，因为是同一个，会被过滤
        this.setState({stus: ['小刘',...stus]})
    }

    changeCar = ()=>{
        // this.setState({carName:'蔚来'})   // 传的是新的对象
        // this.setState({})

        const obj = this.state
        obj.carName = '迈巴赫'
        this.setState(obj)
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {   // 相当于一个阀门
    //     console.log(this.props,this.state)  // 接下来要变化的目标props,目标state
    //     console.log(nextProps,nextState)   // 目前的props和state
    //     if(this.state.carName === nextState.carName) return false
    //     else return true
    //      // 必须有返回值
    // }

    render() {
        const {carName} = this.state
        console.log('Child---render')
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                {this.state.stus}
                <span>我的车名字是：{carName}</span>
                <button onClick={this.changeCar}>点我换车</button>
                <button onClick={this.addStu}>添加小刘</button>
                <Child carName={carName}/>
            </div>
        );
    }
}

class Child extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.props,this.state)  // 接下来要变化的目标props,目标state
        console.log(nextProps,nextState)   // 目前的props和state
        if(this.props.carName === nextProps.carName) return false
        else return true
    }

    render(){
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                <span>我接到的车是：{this.props.carName}</span>
            </div>
        )
    }
}

export default Parent;