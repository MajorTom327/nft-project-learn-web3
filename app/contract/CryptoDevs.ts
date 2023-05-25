import type { Provider } from "@ethersproject/providers";
import type { BigNumber, Signer } from "ethers";
import { utils } from "ethers";
import { Contract } from "ethers";
import constants from "~/refs/constants";


export class CryptoDevs {
  adress = constants.contractAddress;
  abi = constants.abi;
  contract: Contract;
  provider: Signer | Provider;
  price = utils.parseEther("0.01");

  constructor(provider: Signer | Provider | undefined) {
    if (!provider) throw new Error("No provider");

    this.provider = provider;
    this.contract = new Contract(this.adress, this.abi, provider);
  }

  presaleMint() {
    return new Promise(async (resolve, reject) => {
      const tx = this.contract.presaleMint({
        value: this.price,
      });

      await tx.wait();

      resolve(tx);
    });
  }

  mint() {
    return new Promise(async (resolve, reject) => {
      const tx = this.contract.mint({
        value: this.price,
      });

      await tx.wait();

      resolve(tx);
    });
  }

  startPresale() {
    return new Promise(async (resolve, reject) => {
      const tx = this.contract.startPresale();

      await tx.wait();

      resolve(null);
    });
  }

  getOwner(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const owner = await this.contract.owner();

      resolve(owner);
    });
  }

  getSupply(): Promise<{ supply: number; totalSupply: number }> {
    return new Promise(async (resolve, reject) => {
      const [supply, totalSupply] = await Promise.all<BigNumber[]>([
        this.contract.tokenIds(),
        this.contract.maxTokenIds(),
      ]);

      resolve({
        supply: supply.toNumber(),
        totalSupply: totalSupply.toNumber(),
      });
    });
  }

  setUri(uri: string) {}
}

export default CryptoDevs;
