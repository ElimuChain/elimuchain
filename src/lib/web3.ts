import { ethers } from "ethers";

import ElimuChainABI from "../contracts/ElimuChain.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  async connect() {
    try {
      if (!this.provider) {
        throw new Error("Please install MetaMask to use this application");
      }

      await this.provider.send("eth_requestAccounts", []);
      const signer = await this.provider.getSigner();

      if (!CONTRACT_ADDRESS) {
        throw new Error("Contract address not configured");
      }

      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ElimuChainABI,
        signer
      );
      return signer.getAddress();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw error;
    }
  }

  async issueCredential(recipientAddress: string, credentialHash: string) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      const tx = await this.contract.issueCredential(
        recipientAddress,
        credentialHash
      );
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error issuing credential:", error);
      throw error;
    }
  }

  async verifyCredential(credentialId: string) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      const credential = await this.contract.verifyCredential(credentialId);
      return credential;
    } catch (error) {
      console.error("Error verifying credential:", error);
      throw error;
    }
  }
}

export const web3Service = new Web3Service();
