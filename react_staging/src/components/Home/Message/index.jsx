import React, {Component} from 'react';
import {Route} from "react-router-dom";

class Message extends Component {
    state = {
        messageArr:[
            {id:'01',title:'消息1'},
            {id:'02',title:'消息2'},
            {id:'03',title:'消息3'},
        ]
    }
    render() {
        const { messageArr } = this.state
        return (
            <div>
                <ul>
                    {
                        messageArr.map((msgObj) => {
                            return (
                                <li key={msgObj.id}>
                                    {/*<a href={"/xxxxx"}>{msgObj.title}</a>&nbsp;&nbsp;*/}
                                    <Link to={`/home/message/detail/${msgObj.id}`}>{msgObj.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                {/*声明接收params参数*/}
                {/*<Route path="/home/message/detail/:id/:title" component={Detail}></Route>*/}
            </div>

        );
    }
}

export default Message;