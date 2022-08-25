import logo from "./logo.svg";
import "./App.css";
import toast, { Toaster } from 'react-hot-toast'
import BankScreen from "./screens/BankScreen";
import { useEffect } from "react";



function App() {
  return(
    <>
     <Toaster/>
    <BankScreen accountNumber={"12345"} ecomAccountNumber={"54321"} amount={"123456"} email={"frcshovon@gmail.com"}/>
    </>
  )
}

export default App;
