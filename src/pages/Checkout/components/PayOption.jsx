import React from "react";

const PayOption = ({ option, setOption }) => {
  return (
    <label className="bg-gray-400 text-white p-3 flex-1 gap-2" htmlFor="paystack">
      <input type="radio" name="paystack" id="paystack" className="hidden" />
      {option}
    </label>
  );
};

export default PayOption;
