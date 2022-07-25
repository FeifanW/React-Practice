import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import axios from 'axios'

class Search extends Component {
    search = async ()=>{
        // PubSub.publish('wangwangdui',{name:'tom',age:'18'})



        // 获取用户的输入
        // console.log(this.keyWordElement.value)
        const {keyWordElement:{value}} = this
        // 发送请求前通知app更新状态
        // this.props.updateAppState({isFirst: false,isLoading: true})
        // PubSub.publish('wangwangdui',{isFirst: false,isLoading: true})

        // console.log("value",value)
        // axios发送网络请求
        // axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(
        //     response => {
        //         console.log('成功了', response.data)
        //         // 请求成功后通知app更新状态
        //         // this.props.updateAppState({isLoading: false, users:response.data.items})
        //         PubSub.publish('wangwangdui',{isLoading: false, users:response.data.items})
        //     },
        //     error => {
        //         console.log('失败了', error)
        //         // 请求失败后通知APP更新状态
        //         // this.props.updateAppState({isLoading: false, err:error.message})
        //         PubSub.publish('wangwangdui',{isLoading: false, err:error.message})
        //     }
        // )

        // 发送网络请求---使用fetch发送(未优化版本)
        // fetch(`/api1/search/user2?q=${value}`).then(
        //     response => {
        //         console.log('联系服务器成功了', response)
        //         return response.json()
        //     },
        //     // error => {
        //     //     console.log('联系服务器失败了',error)
        //     //     return new Promise()
        //     // }
        // ).then(
        //     response => {console.log("获取数据成功了",response)},
        //     // error => {console.log('获取数据失败了',error)}
        // ).catch(
        //     (error)=>{ console.log(error)}
        // )

        // 优化版本--使用fetch发送
        try {
            const response = await fetch(`/api1/search/users2?q=${value}`)
            const data = await response.json()
            console.log('data',data)
            PubSub.publish('wangwangdui',{isLoading: false,users:data.items})
        } catch(error){
            console.log('请求出错',error)
            PubSub.publish('wangwangdui',{isLoading: false, err:error.message})
        }

    }
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">搜索github用户</h3>
                    <div>
                        <input ref={c => this.keyWordElement = c } type="text" placeholder="输入关键词点击搜索"/>&nbsp;
                        <button onClick={this.search}>搜索</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Search;