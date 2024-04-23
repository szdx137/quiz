import { useState } from "react";
import Login from "./components/login-register/Login";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
