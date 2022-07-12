import logo from './logo.svg';
import './App.css';
import Hello from './components/hello/hello'
import Welcome from './components/welcome/welcome'


function App() {

    const todos = [
      {id:1,name:'吃饭',done:true},
      {id:2,name:'吃饭',done:true},
      {id:3,name:'吃饭',done:true},
      {id:4,name:'吃饭',done:true},
    ]
    function handleKeyUp(event){
      console.log(event.target.value)
    }
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <input onKeyUp={handleKeyUp}/>
            </div>
            <div>
              <Hello a={'hhhhh'}></Hello>
              <Welcome todos={todos}></Welcome>
            </div>
          </header>
        </div>
    );
}

export default App;
