// 该文件时用于创建一个为count组件服务的reducer，reducer的本质就是一个函数
// reducer会接到两个参数，分别为之前的状态（preState）动作对象（action）
export default function countReducer(preState,action){
    const {type,data} = action
    // 根据type决定如何加工数据
    switch(type) {
        case 'increment':
            return preState + data
        case 'decrement':
            return preState - data
        default:
            return 0
    }
}