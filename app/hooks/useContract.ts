import type { providers } from "ethers";
import { useMemo } from "react";
import CryptoDevs from "~/contract/CryptoDevs";


export const useContract = (provider: providers.JsonRpcSigner) => {
  return useMemo(() => new CryptoDevs(provider), [provider]);
};

export default useContract;
