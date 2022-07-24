import React, {Component} from 'react';
import axios from 'axios'

class Search extends Component {
    search = ()=>{
        // 获取用户的输入
        // console.log(this.keyWordElement.value)
        const {keyWordElement:{value}} = this
        // 发送请求前通知app更新状态
        this.props.updateAppState({isFirst: false,isLoading: true})
        console.log("value",value)
        // 发送网络请求
        axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(
            response => {
                console.log('成功了', response.data)
                // 请求成功后通知app更新状态
                this.props.updateAppState({isLoading: false, users:response.data.items})
            },
            error => {
                console.log('失败了', error)
                // 请求失败后通知APP更新状态
                this.props.updateAppState({isLoading: false, err:error.message})
            }
        )
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