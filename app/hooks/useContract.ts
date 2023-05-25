import type { providers } from "ethers";
import { useMemo } from "react";
import CryptoDevs from "~/contract/CryptoDevs";

export const useContract = (provider: providers.Web3Provider) => {
  return useMemo(() => new CryptoDevs(provider), [provider]);
};

export default useContract;
