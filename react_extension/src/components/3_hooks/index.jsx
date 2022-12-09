import React from 'react';
import ReactDOM from "react-dom";

// 类式组件

// class Demo extends React.Component {
//     state = {count:0}
//
//     myRef = React.createRef()
//
//     add = ()=>{
//         this.setState(state => ({count:state.count+1}))
//     }
//
//     unmount = ()=>{
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
//
//     componentDidMount() {
//         setInterval(()=>{
//             this.setState(state => ({count:state.count+1}))
//         },1000)
//     }
//
//     show = ()=>{
//         alert(this.myRef.current.value)
//     }
//
//     render() {
//         return (
//             <div>
//                 <input type="text" ref={this.myRef} />
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//                 <button onClick={this.unmount}>卸载组件</button>
//                 <button onClick={this.show}>点击提示数据</button>
//             </div>
//         );
//     }
// }

// 函数组件
function Demo(){

    const [count,setCount] = React.useState(0)   // 里面写初始值
    const myRef = React.useRef()

    React.useEffect(()=>{    // 组件挂载和更新的时候都执行
        let timer = setInterval(()=>{
            setCount(count => count + 1)
        },1000)
        return ()=>{
            clearInterval(timer)
        }
    },[])      // 不加空数组会检测所有，加上空数组之后谁也不检测，里面写谁就检测谁
    // 第一个参数返回的函数相当于willUnmount

    // 加的回调
    function add(){
        console.log('点击了加号')
        // setCount(count+1)   // 第一种写法
        setCount(count => count+1)
    }
    // 提示输入的回调
    function show(){
        alert(myRef.current.value)
    }

    // 卸载组件的回调
    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    return (
        <div>
            <input type='text' ref={myRef}/>
            <h2>当前求和为{count}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={unmount}>卸载组件</button>
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}
export default Demo;