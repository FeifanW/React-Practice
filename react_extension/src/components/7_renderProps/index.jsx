import React, {Component} from 'react';

class Index extends Component {
    render() {
        return (
            <div>
                <h3>我是Parent组件</h3>
                {/*<A>*/}
                {/*    <B/>*/}
                {/*</A>*/}
                <A render={(name)=><B name={name}/>} />
            </div>
        );
    }
}

class A extends Component {
    state = {name:'tom'}
    render() {
        const {name} = this.state
        return (
            <div>
                <h3>我是A组件</h3>
                {/*{this.props.children}*/}
                {this.props.render(name)}
            </div>
        );
    }
}

class B extends Component {
    render() {
        return (
            <div>
                <h3>我是B组件</h3>
            </div>
        );
    }
}

export default Index;