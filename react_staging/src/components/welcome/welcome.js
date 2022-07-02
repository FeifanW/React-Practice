import React,{Component} from 'react'
import welcome from  './welcome.module.css'

export default class Welcome extends Component{
  render() {
    const {todos} = this.props
    return (
        <ul>
          {
            todos.map((todo)=>{
              return <li key={todo.id}>todo</li>
            })
          }
        </ul>
    )
  }
}

