##### Redirect的使用

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配的时候，跳转到Redirect指定的路由

2. 具体编码：

   ```react
   <Switch>
   	<Route path='./xxx' component={xxx}/>
       <Route path='./xxx' component={xxx}/>
       <Redirect to="/xxx"/>
   </Switch>
   ```

##### 嵌套路由

1. 注册子路由时要写上父路由的path值

2. 路由的匹配是按照注册路由的顺序进行的


##### 向路由组件传递参数

1. params参数

   路由链接（携带参数）：

   ```react
   <Link to='demo/test/tom/18'>详情</Link>
   ```

   注册路由（声明接收）：

   ```react
   <Route path="/demo/test/:name/:age" component={Test}></Route>
   ```

   接收参数：

   ```react
   const {name,age} = this.props.match.params
   ```

2. search参数

   urlencoded格式编码：key=value&key=value

   react自带一个库，处理这种转换

   ```react
   import qs from 'querystring'
   ```

   search参数无需声明接收，正常注册路由即可

   路由链接（携带参数）：

   ```react
   <Link to='/demo/test?name=tom&age=18'>详情</Link>
   ```

   注册路由（无需声明，正常注册即可）：

   ```react
   <Route path="/demo/test" component={Test} />
   ```

   接收参数：

   ```js
   const { search } = this.props.location
   ```

   备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

3. state参数

   location是history的属性

   路由链接（携带参数）：

   ```react
   <Link to={{path:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
   ```

   注册路由（无需声明，正常注册即可）：

   ```react
   <Route path="/demo/test" component={Test}/>
   ```

   接收参数：

   ```react
   this.props.location.state
   ```

   备注：刷新也是可以

   默认是push模式，开启replace需要在Link标签里面加replace={true}

##### 编程式路由导航

不用用户自己点，可以自己控制跳转

一般组件没有history，只有路由组件有

借助this.props.history对象上的API操作对路由跳转、前进和后退

this.props.history.push()

this.props.history.replace()

this.props.history.goBack()

this.props.history.goForward()

this.props.history.go()

路由组件：接收三个固定的属性

- history：

  go：f go(n)

  goBack：f  goBack()

  goForward:  f goForward()

  push：f  push(path，state)

  replace：f  replace(path，state)

- location：

  pathname："/about"

  search：""

  state：undefined

- match：

  params：{}

  path："/about"

  url："/about"

##### withRouter

一般组件在withRouter处理之后，也可以有路由组件的API

withRouter返回值是一个新组件

```react
import {withRouter} from 'react-router-dom'
export default withRouter(XXX)   
```

##### BrowserRouter与HashRouter的区别

1. 底层原理不一样：

   BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。HashRouter使用的是URL的哈希值

2. url表现形式一样

   BrowserRouter的路径中没有#，例如：localhost:3000/demo/test

   HashRouter的路径包含#，例如：localhost:3000/#/demo/test

3. 刷新后对路由state参数的影响

   - BrowserRouter没有任何影响，因为state保存在history对象中
   - HashRouter刷新后会导致路由state参数的丢失

4. 备注：HashRouter可以用于解决一些路径错误相关的问题

##### antd使用

antd4.x文档不详细，可以去看3.x

yarn eject会把react里面webpack的核心配置都给暴露出来

react里面的插件都需要下载、引入、实例化

按需引入：

去官网文档查看，需要对create-react-app的默认配置进行自定义，引入react-app-rewired并修改package.json里的启动配置

在项目的根目录创建一个config-overrides.js用于修改默认配置

```js
yarn add react-app-rewired customize-cra
```

##### antd自定义主题

1. 安装依赖

   先安装less和less-loader  react-app-rewired customize-cra babel-plugin-import less less-loader

2. 修改package.json

   ```js
   "scripts":{
       "start":"react-app-rewired start",
       "build":"react-app-rewired build",
       "test":"react-app-rewired test",
       "eject":"react-scripts eject",
   }
   ```

3. 根目录下创建config-overrides.js

```js
module.exports = override(
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true
    })
    addLessLoader({
    	lessOptions:{
            javascriptEnable: true,
            modifyVars:{'@primary-color':'orange'}    
    	}
    })
)
```

备注：不需要在组件里面亲自引入样式了，即import 'antd/dist/antd.css'应该删掉

##### redux

1. redux是专门用于做状态管理的JS库
2. 作用：集中式管理react应用中多个组件的共享状态

什么情况下使用redux:

1. 某个组件状态，需要让其它组件可以随时拿到（共享）
2. 一个组件需要改变另一个组件状态（通信）
3. 总体原则：能不用刘不用，如果不用比较吃力才考虑使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/4dc246049eac4c53b137608994ea44cc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjQzNTIzNA==,size_16,color_FFFFFF,t_70)

store相当于一个指挥者

reducers是执行者，加工状态，需要传入之前的状态

reducer可以做两件事，初始化状态、加工状态

react components相当于客人

action creators相当于服务员

store相当于老板

reducers相当于后厨

##### redux的使用

在src目录下，新建一个redux文件夹，里面新建一个count_reducer.js和store.js

store.js

```js
// 该文件专门用于暴露一个store对象，整个应用只有一个store对象
// 引入createStore，专门用于创建redux中最核心的store对象
import { createStore } form 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'

export default createStore(countReducer)

```

count_reducer.js

```js
// 该文件时用于创建一个为count组件服务的reducer，reducer的本质就是一个函数
// reducer会接到两个参数，分别为之前的状态（preState）动作对象（action）
export default function countReducer(preState,action){
    const {type,data} = action
    // 根据type决定如何加工数据
    switch(type) {
        case 'increment':
            return preState + data
        case 'decrement':
            return preState - data
        default:
            return 0
    }
}
```

在需要的组件里面引用

```js
import { state } form 'xxx'       //redux的store
// 一开始初始化的时候没有type
// 在函数里面调用方法
export default class Count extends Component {
    componentDidMount(){  // redux中任意状态变化都会调用这个回调
        // 检测redux中任意状态的变化，只要变化就调用render
        store.subscribe(()=>{
            this.setState({})
        })
    }
    increment = ()=>{
        const {value} = this.selectNumber
        store.dispatch({type:'increment',data:value*1})
    }    
}
```

this.setState可以帮忙改状态，还会重新render一下

```react
// redux更新可以放在index.js里面
import store from './redux/store'
store.subscribe(()=>{
    ReactDOM.render(<App/>,document.getElementById('root'))
})
```

##### redux简单总结

1. 去除Count组件自身状态

2. src下建立：

   -redux

   ​	-store.js

   ​	-count_reducer.js

3. store.js

   - 引入redux中的createStore函数，创建一个store
   - createStore调用时要传入一个为其服务的reducer
   - 记得暴露store对象

4. count_reducer.js

   - reducer的本质是一个函数，接收：preState，action 返回加工后的状态
   - reducer有两个作用：初始化状态，加工状态
   - reducer被第一次调用时，是store自动触发的，传递的preState是undefined

5. 在index.js中检测store中状态的改变，一旦发生改变重新渲染\<App/>

   备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写

**count_action.js**

```js
// 专门为Count组件生成action对象
export const createIncrementAction = data => ({type:'increment',data})
export const createDecrementAction = data => ({type:'decrement',data})
```

在组件中使用的时候，直接

```js
// 引入这个count_action.js
```

**constant.js**

```js
// redux下面定义常量的地方，防止在redux的其他文件里面写错
export const INCREMENT = 'increment'
```

##### 异步action

action:

1. Object{}  同步
2. function 异步

同步action，action的值为Object类型的一般对象

异步action，就是action的值为函数

异步action，就是action的值为函数

```js
// 在count_action里面添加异步，就是action的值为函数，异步action中一般都会调用同步action，异步action不是必须要用的
export const createIncrementAsyncAction = (data,time) => {
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(createIncrementAction(data))
        },time)
    }
}
```

传给store会报错，需要一个中间件

npm i redux-thunk -S

在store.js里面引入

```js
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
// 暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```

