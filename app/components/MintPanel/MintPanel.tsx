import type { providers } from "ethers";
import React, { useEffect } from "react";
import { Button } from "react-daisyui";

import useContract from "~/hooks/useContract";
import { useGetSupply } from "~/hooks/useGetSupply";

type Props = {
  provider: providers.JsonRpcSigner;
};

export const MintPanel: React.FC<Props> = ({ provider }) => {
  const cryptoDevs = useContract(provider);
  const supply = useGetSupply(cryptoDevs);
  const [isOwner, setIsOwner] = React.useState<boolean>(false);

  useEffect(() => {
    cryptoDevs.getOwner().then((owner) => {
      return provider.getAddress().then((address) => {
        setIsOwner(owner === address);
      });
    });
  }, [cryptoDevs]);

  const handlePresaleMint = async () => {
    await cryptoDevs?.presaleMint();
  };
  const handleMint = async () => {
    await cryptoDevs?.mint();
  };

  const handleStartSale = async () => {
    await cryptoDevs?.startPresale();
  };

  return (
    <>
      <div className="grid gap-2 grid-cols-2">
        <h2 className="text-xl font-primary">Mint</h2>
        <h2 className="text-xl font-primary">
          {supply.supply} / {supply.totalSupply}
        </h2>

        <Button onClick={handlePresaleMint}>PresaleMint</Button>
        <Button onClick={handleMint}>Mint</Button>

        {isOwner && <Button onClick={handleStartSale}>Start Sale</Button>}
      </div>
    </>
  );
};

MintPanel.defaultProps = {};

export default MintPanel;
