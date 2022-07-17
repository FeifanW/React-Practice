import React,{Component} from 'react'
import './hello.css'


export default class Hello extends Component{
  render() {
    console.log(this.props.a)
    return <h2 className="demo">Hello</h2>
  }
}
