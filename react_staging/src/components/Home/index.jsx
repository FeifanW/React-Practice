import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import  News  from './News/index'
import Message from './Message/index'

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    我是Home
                </div>
                /*注册路由*/
                <Switch>
                    <Route path="/home/news" component={News}/>
                    <Route path="/home/message" component={Message}/>
                </Switch>
            </div>
        );
    }
}

export default Home;