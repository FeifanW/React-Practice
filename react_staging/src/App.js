import React, {Component} from 'react'
import axios from 'axios'

export default class App extends Component {
    getStudentData = () => {
        // axios.get('http://localhost:3000/index.html').then(
        axios.get('http://localhost:3000/students').then(
            response => { console.log('成功了', response.data)},
            error => { console.log('失败了',error)}
        )
    }
    render() {
        return(
            <div>
                <button onClick={this.getStudentData}>点我获取一些学生数据</button>
            </div>
        )
    }
}