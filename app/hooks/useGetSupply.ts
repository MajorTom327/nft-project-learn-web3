import { useEffect, useState } from "react";
import type CryptoDevs from "~/contract/CryptoDevs";

export const useGetSupply = (contract: CryptoDevs) => {
  const [supply, setSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    contract.getSupply().then(({ supply, totalSupply }) => {
      setSupply(supply);
      setTotalSupply(totalSupply);
    });

    const intervale = setInterval(() => {
      contract.getSupply().then(({ supply, totalSupply }) => {
        setSupply(supply);
        setTotalSupply(totalSupply);
      });
    }, 10000);

    return () => clearInterval(intervale);
  }, [contract]);

  return { supply, totalSupply };
};
