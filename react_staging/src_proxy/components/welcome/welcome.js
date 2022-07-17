import React,{Component} from 'react'
import './welcome.module.css'

export default class Welcome extends Component{

  handleMouse = (flag) => {
    return ()=>{
      console.log(flag)
    }
  }
  render() {
    const {todos} = this.props
    return (
        <ul>
          {
            todos.map((todo)=>{
              return <li key={todo.id} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>{todo.name}</li>
            })
          }
        </ul>
    )
  }
}

