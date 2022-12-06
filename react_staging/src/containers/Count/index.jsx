// 引入Count的UI组件
import CountUI from '../../components/Count/index'
// 引入store
// import store from '../../redux/store'
// 引入connect用于连接UI组件和redux
import { connect } from 'react-redux'


// 使用connect()()创建并暴露一个Count的容器组件
const CountContainer = connect()(CountUI)
export default CountContainer