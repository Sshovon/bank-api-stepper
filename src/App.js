import logo from "./logo.svg";
import "./App.css";

import BankScreen from "./screens/BankScreen";
import { useEffect } from "react";



function App() {
  return(
    <BankScreen accountNumber={"12345"} amount={"123456"}/>
  )
}

export default App;
