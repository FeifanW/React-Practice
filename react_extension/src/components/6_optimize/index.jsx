import React, {Component} from 'react';

class Parent extends Component {
    state = {carName:'雷克萨斯'}

    changeCar = ()=>{
        this.setState({carName:'蔚来'})
    }

    render() {
        const {carName} = this.state
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                <span>我的车名字是：{carName}</span>
                <button onClick={this.changeCar}>点我换车</button>
                <Child carName={carName}/>
            </div>
        );
    }
}

class Child extends Component {
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