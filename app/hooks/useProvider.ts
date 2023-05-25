import { providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";


export const useProvider = () => {
  const web3ModalRef = useRef<Web3Modal>();
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();

  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>();

  const connect = () => {
    console.log("Connecting to wallet");

    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      web3ModalRef.current.connect().then((provider) => {
        const web3Provider = new providers.Web3Provider(provider);

        setProvider(web3Provider);
        setWalletConnected(true);

        setSigner(web3Provider.getSigner());
      });
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return {
    provider,
    getSigner: provider?.getSigner(),
    signer,
    connect,
    isConnected: walletConnected,
  };
};
