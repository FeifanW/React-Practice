import React, {Component,Fragment} from 'react';

class Demo extends Component {
    render() {
        return (
            // Fragment是可以写key值的，但是空标签<>不能写key值
            <Fragment>
                <input type='text'/>
                <input type='text'/>
            </Fragment>
        );
    }
}

export default Demo;