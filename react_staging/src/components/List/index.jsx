import React, {Component} from 'react';
import './index.css'

class List extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.props.users.map((userObj)=>{
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