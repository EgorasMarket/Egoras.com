import React, { useEffect, useState } from "react";
import { GET_KYC_STATUS } from "../services/kyc_services";
import { levels, status } from "../components/KYC/KycComps";

const useUserEligible = () => {
  const [response, setResponse] = useState(false);
  //check if user is eligible to purchase a product

  const fetchKyCStatus = async () => {
    const res = await GET_KYC_STATUS();
    console.log(res);

    if (
      (res.data.data.level === levels.level2 &&
        res.data.data.status === status.verified) ||
      (res.data.data.level === levels.level3 &&
        res.data.data.status === status.verified)
    ) {
      setResponse(true);
      return;
    }
    setResponse(false);
  };
  useEffect(() => {
    fetchKyCStatus();
  }, []);

  return response;
};

export default useUserEligible;
