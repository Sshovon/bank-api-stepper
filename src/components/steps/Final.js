import React,{useContext} from 'react'
import { StepperContext } from "../../contexts/StepperContext";
import {MdOutlineFileDownloadDone} from 'react-icons/md'
function Final() {
  const { userData, setUserData } = useContext(StepperContext);
    return (
        <div className="container md:mt-10">
      <div className="flex flex-col items-center">
       
        <MdOutlineFileDownloadDone style={{color:'green', }} size={50}/>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          {`You have successfully paid ${userData.amount}৳.`}<br/>
          {/* {`Your TrxID is ${userData.trx}.`} */}

        </div>
        <a className="mt-10" href="/user/dashboard">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Close
          </button>
        </a>
      </div>
    </div>
    )
}

export default Final
