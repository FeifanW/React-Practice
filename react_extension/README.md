## 扩展笔记

#### 1、setState

​	状态的更新是异步的

1. setState(stateChange, [callback])  --- 对象式setState

   - stateChange为状态改变对象(该对象可以体现出状态的更改)
   - callback是可选的回调函数，它在状态更新完毕、界面也更新后（render调用后）才被调用

2. setState(updater,[callback])  ---- 函数式setState

   - updater为返回stateChange对象的函数
   - updater可以接收到state和props
   - callback是可选的回调函数，它在状态更新、界面也更新后（render调用后）才被调用

   总结：

   1. 对象式的setState是函数式setState的简写方式（语法糖）
   2. 使用原则：
      1. 如果新状态不依赖于原状态 ===> 使用对象方式
      2. 如果新状态依赖于原状态 ===> 使用函数方式
      3. 如果需要在setState()执行后获取最新的状态数据需要在第二个callback函数中读取

#### 2、lazyLoad

```react
import React, {Component,lazy,Suspense} from 'react'
// suspense就是网络慢时，懒加载的组件还没回来时显示的内容
const Home = lazy(()=>import('./Home'))
const About = lazy(()=>import('./About'))

// 在注册路由的地方，如果用loading组件的话，loading组件不要懒加载
<Suspense fallback={<h1>Loading...</h1>}>
      <Route path="/about" component={About}/>
      <Route path="/home" component={Home}/>
</Suspense>  
```

#### 3、Hooks

1. React Hook/Hooks是什么?

   - Hook是React 16.8.0版本新增加的新特性/新语法
   - 可以让你在函数组件中使用state 以及其他的React特性

2. 三个常用的Hook

   - State Hook：React.useState()
   - Effect Hook：React.useEffect()
   - Ref Hook：React.useRef()

3. State Hook

   - State Hook让函数组件也可以有state状态，并进行状态数据的读写操作

   - 语法：const [xxx, setxxx] = React.useState(initValue)

   - useState()说明：

     参数：第一次初始化指定的值在内部作缓存

     返回值：包含2个元素的数组，第1个为内部当前状态值，第2个为更新状态值的函数

   - setXXX()2种写法：

     setXxx(newValue)：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值

     setXxx(value => newValue)：参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值

4. Effect Hook

   - Effect Hook 可以让你在函数组件中执行副作用操作（用于模拟类组件中的生命周期钩子）

   - React中的副作用操作：

     发ajax请求数据获取

     设置订阅/启动定时器

     手动更改真实DOM

   - 语法和说明：

     ```react
     useEffect(()=>{
         //在此可以执行任何带副作用的操作
     })
     ```

5. Ref Hook

   - Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
   - 语法：const refContainer = useRef()
   - 作用：保存标签对象，功能与React.createRef()一样

#### 4、stateHook

```react
import React from 'react';

// 类式组件

// class Demo extends React.Component {
//     state = {count:0}
//     add = ()=>{
//         this.setState(state => ({count:state.count+1}))
//     }
//     render() {
//         return (
//             <div>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//             </div>
//         );
//     }
// }

// 函数组件
function Demo(){

    const [count,setCount] = React.useState(0)   // 里面写初始值
    const [name,setName] = React.useState('tom')   // 里面写初始值

    // 加的回调
    function add(){
        console.log('点击了加号')
        // setCount(count+1)   // 第一种写法
        setCount(count => count+1)
    }
    function changeName(){
        setName('jack')
    }
    return (
        <div>
            <h2>当前求和为{count}</h2>
            <h2>我的名字是：{name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
        </div>
    )
}
export default Demo;
```

#### 5、EffectHook

可以在函数组件中使用生命周期钩子

```react
import React from 'react';
import ReactDOM from "react-dom";

// 类式组件

// class Demo extends React.Component {
//     state = {count:0}
//     add = ()=>{
//         this.setState(state => ({count:state.count+1}))
//     }
//     componentDidMount() {
//         setInterval(()=>{
//             this.setState(state => ({count:state.count+1}))
//         },1000)
//     }
//
//     render() {
//         return (
//             <div>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//             </div>
//         );
//     }
// }

// 函数组件
function Demo(){

    const [count,setCount] = React.useState(0)   // 里面写初始值

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
    // 卸载组件的回调
    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    return (
        <div>
            <h2>当前求和为{count}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={unmount}>卸载组件</button>

        </div>
    )
}
export default Demo;
```

#### 6、RefHook

```react
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
```

#### 7、Fragment

有点像vue里的template标签

```react
import React, {Component,Fragment} from 'react';

class Demo extends Component {
    render() {
        return (
            // Fragment是可以写key值的，但是空标签<>不能写key值
            <Fragment>
                <input type='text'/>
                <input type='text'/>
            </Fragment>
        );
    }
}

export default Demo;
```

#### 8、Context

一种组件间的通信方式，常用于[祖组件] 与 [后代组件] 间通信

- 创建Context容器对象：

  ```js
  const XxxContent = React.createContext()
  ```

- 渲染子组时，外面包裹xxxContext.Provider，通过value属性给后代组件传递数据：

  ```react
  <xxxContext.Provider value={数据}>
  	子组件
  </xxxContext.Provider>
  ```

- 后代组件读取数据：

  ```react
  // 第一种方式：仅适用于类组件
  static contextType = xxxContext    // 声明接收context
  this.context  // 读取context中的value数据
  // 第二种方式：函数组件与类组件都可以
  <xxxContext.Consumer>
      {
      	value => (   // value就是context中的value数据
      		要显示的内容
      	)
  	}
  </xxxContext.Consumer>
  ```

- 案例：

  ```react
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
  ```

#### 9、组件优化

##### Component的2个问题

- 只要执行setState()，即使不改变状态数据，组件也会重新render()
- 只要当前组件重新render()，就会重新render子组件 ===> 效率低

##### 效率高的做法

只有当组件的state或props数据发生改变时才重新render()

##### 原因

component中shouldComponentUpdate()总是返回true

##### 解决

办法1：

- shouldComponentUpdate()方法
- 比较新旧state或props数据，如果有变化才返回true，如果没有返回false

办法2：

- 使用PureComponent
- PureComponent重写shouldComponentUpdate()，只有state或props数据有变化才返回true
- 注意：
  - 只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回false
  - 不要直接修改state数据，而是产生新数据

项目中一般使用PureComponent来优化





