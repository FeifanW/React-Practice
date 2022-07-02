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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <Hello a={'hhhhh'}></Hello>
          <Welcome todos={todos}></Welcome>
        </a>
      </header>
    </div>
  );
}

export default App;
