import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import './index.css'

class List extends Component {
    state = {  // 初始化状态，users初始值为数组
        users:[],
        isFirst:true,   // 是否是第一次打开页面
        isLoading:false,   // 是否处于加载中
        err:'',    // 存储错误信息
    }

    componentDidMount() {
        this.token = PubSub.subscribe('wangwangdui',(_,data)=>{
            console.log('List组件收到数据了',data)
            this.setState(data)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        // const {users, isFirst, isLoading, err} = this.state
        const {users, isFirst, isLoading, err} = this.state
        return (
            <div>
                <div className="row">
                    {
                        isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
                            isLoading ? <h2>Loading...</h2> :
                                err ? <h2 style={{color:'red'}}>{err}</h2> :
                        users.map((userObj)=>{
                            return (
                                <div className="card">
                                    <a href={userObj.html_url} rel="noreferrer" target="_blank">
                                        <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
                                    </a>
                                    <p className="card-text">{userObj.login}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default List;