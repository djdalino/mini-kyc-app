import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import UserInput from "../Step/UserInput";
import StepOne from "../Step/StepOne";
import StepTwo from "../Step/StepTwo";
import StepTwoB from "../Step/StepTwoB";
import StepThree from "../Step/StepThree";
import SuccessPage from "../Step/SuccessPage";
const SwitchPage = () => {
  const { count } = useContext(HeaderContext);
  switch (count) {
    case 0:
      return <UserInput />;
    case 1:
      return <StepOne />;
    case 2:
      return <StepTwo />;
    case 3:
      return <StepTwoB />;
    case 4:
      return <StepThree />;
    case 5:
      return <SuccessPage />;
    default:
      return <StepOne />;
  }
};

export default SwitchPage;
