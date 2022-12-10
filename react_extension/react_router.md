#### 1、概述

1. React Router以三个不同的包发布到npm上，它们分别为：

   - react-router  路由的核心库，提供了很多的：组件、钩子
   - react-router-dom  包含react-router所以内容，并添加一些专门用于DOM的组件，例如、\<BrowserRouter>等
   - react-router-native  包括react-router所以内容，并添加一些专门用于ReactNative的API，例如：\<NativeRouter>等

2. 与React Router 5.x 版本相比，改变了什么？

   - 内置组件的变化：移除\<Switch/>，新增\<Routes>等。

   - 语法的变化：component={About} 变为 element={\<About/>}等。

   - 新增多个hook：useParams、useNavigate、useMatch等。

   - 官方明确推荐**函数式组件**了！！

     ...

#### 2、一级路由

输入rcc或者rfc自动生成代码的vscode插件：ES7+ React/Redux/React-Native snippets

class变成className

```react
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

ReactDOM.render(
	<BrowserRouter>
        <App></App>
    </BrowserRouter>,
    document.getElementById('root')
)
```

在路由链接的地方

```react
import {NavLink,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'

export default function App(){
    return (
        // 路由链接
 		<NavLink to="/about">About</NavLink>   
        <NavLink to="/home">Home</NavLink>   
        // 注册路由
        <Routes>
        	<Route path='/about' element={<About/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
        </Routes>
    )
}
```

原来switch的左右就是防止，匹配成功后向下接着匹配

#### 3、重定向

Navigate这个组件只要渲染一定会引起试图的切换

Routes替代了switch

- v6版本中移出了先前的\<Switch>，引入了新的替代者\<Routes>
- \<Routes>和\<Route>要配合使用，且必须要用\<Routes>包裹\<Route>
- \<Route>相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件
- \<Route caseSensitive>属性用于指定：匹配时是否区分大小写（默认为false）
- 当URL发生变化时，\<Routes>都会查看其所有子\<Route>元素以找到最佳匹配并呈现组件
- \<Route>也可以嵌套使用，且可配合useRoutes()匹配“路由表”，但需要通过\<Outlet>组件来渲染其子路由

#### 4、NavLink高亮

router6里面，如果想实现自定义的类型，则需要把className写成一个函数

```react
<NavLink className={({isAvtive})=>isActive ? 'list-item hightlight' : 'list-item'} to='/about'></NavLink>

//或者分开写
function computedClassName({isActive}){
    return isActive ? 'list-item hightlight' : 'list-item'
}
<NavLink className={computedClassName} to="/about">About</NavLink>
```

#### 5、useRoutes路由表

```react
import {useRoutes} from 'react-router-dom'
// 可以把里面的内容单独放一个文件中 
export default function App(){
    const element = useRoutes([
        {
            path:'/about',
            element:<About/>
        },
        {
            path:'/home',
            element:<Home/>
        },
        {
            path:'/',
            element:<Navigate to="/about"/>
        },
    ])
    // 注册路由的地方
    {element}
}
```

#### 6、嵌套路由

outlet有点像vue里的router-view

```react
// 指定路由组件呈现的位置
<Outlet/>
```

#### 7、路由的params参数

传递参数

```react
return (
	<div>
    	<ul>
        	{
                messages.map((m)=>{
                    return (
                    	// 路由链接
                        <li key={m.id}>
                            <Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
)
```

而且要在对应集中管理的路由文件中，类似vue-router里面写上对应参数的占位符

读取参数使用useParams，或者useMatch

```react
import {useParams,useMatch} from 'react-router-dom'

export default function Detail(){
    const {id,title,content} = useParams()
    const x = useMatch('/home/message/detail/:id/:title/:content')
}
```

#### 8、路由的search参数

search参数有点类似于vue里的query参数，不需要去集中的地方填写占位符

```react
<Link to={`detail?id=${m.id}$title=${m.title}&content=${m.content}`}></Link>
```

获取参数用到useSearchParams，也可以用useLocation

```react
import {useSearchParams,useLocation} from 'react-router-dom'

export default function Detail() {
    const [search,setSearch] = useSearchParams()
    const id = search.get('id')
    const title = search.get('title')
    const content = search.get('content')
    const x = useLocation()
}
```

#### 9、路由的state参数

search参数和state参数都不需要占位

```react
<Link
    to='detail'
    state={{
        id:m.id,
        title:m.title,
        content:m.content
    }}
    >{m.title}</Link>
```

获取参数使用useLocation

```react
import {useLocation} from 'react-router-dom'
export default function Detail(){
    const {state} = useLocation()
    const {state:{id,title,content}} = useLocation()
}
```

#### 10、编程式路由导航

react-router5里面有Link和NavLink，6里面有Link、NavLink、Navigate

```react
import {useNavigate} from 'react-router-dom'
export default function Message(){
    const navigate = useNavigate()
    function showDetail(){
        navigate('/about',{   // 第二个里面可以传参数
            replace:true,
            state:{
                id:m.id,
                title:m.title
            }
        })
        // navigate(-1)  // 后退
        // navigate(1)  // 前进
    }
    ...
    // 给某些按钮添加点击事件showDetail
}
```

#### 11、useInRouterContext

只要被\<BrowserRouter>\</BrowserRouter>包裹，则为真

```react
import {useInRouterContext} from 'react-router-dom'
//...
console.log(useInRouterContext())
```

#### 12、useNavigationType

1. 作用：返回当前的类型导航（用户是如何来到当前页面的）
2. 返回值：POP、PUSH、REPLACE
3. 备注：POP是指在浏览器中直接打开了这个路由组件（刷新页面）

```react
import {useNavigationType} from 'react-router-dom'
//...
console.log(useNavigationType())  // 判断一下是怎么来的
```

#### 13、useOutlet

1. 作用：用来呈现当前组件中渲染的嵌套路由

2. 示例

   ```react
   import {useOutlet} from 'react-router-dom'
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载，则result为null
   // 如果嵌套路由已经挂载，则展示嵌套的路由对象
   ```

#### 14、useResolvedPath

作用：给定一个URL值，解析其中的：path、search、hash值

```react
import {useResolvedPath} from 'react-router-dom'
...
console.log(useResolvedPath('/user?id=001&name=tom#qwe'))
```







