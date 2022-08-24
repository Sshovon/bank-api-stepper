import React, { useRef } from "react";

function OTP() {
    const otpRef = useRef(null)
  return (
    <div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          OTP
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            ref={otpRef}
            name="password"
            placeholder="Password"
            type="password"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default OTP;
