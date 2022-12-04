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







