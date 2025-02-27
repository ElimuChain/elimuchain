import { ethers } from "ethers";
import { ethers } from "ethers";
import ElimuChainABI from "src/contracts/ElimuChain.json";

const ELIMUCHAIN_CONTRACT_ADDRESS = "0x65a22f0dd95924774c97d8768e43ddc59aacb1f9";
const ELIMUCHAIN_ABI: ethers.Interface | ethers.InterfaceAbi = ElimuChainABI;

interface Institution {
  address: string;
  name: string;
  verificationStatus: "pending" | "verified" | "rejected";
  accreditationProof: string;
  verifiers: string[];
}

declare global {
  interface Window {
    ethereum: any;
  }
}

interface BatchCredential {
  id: string;
  credentialHash: string;
  metadataURI: string;
}

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  // private institutions: Map<string, Institution> = new Map();

  constructor() {
    if (window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => this.handleAccountChange());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }

  private async handleAccountChange() {
    if (this.provider) {
      this.signer = await this.provider.getSigner();
      this.updateContract();
    }
  }

  private updateContract() {
    if (this.signer) {
      this.contract = new ethers.Contract(
        ELIMUCHAIN_CONTRACT_ADDRESS,
        ELIMUCHAIN_ABI,
        this.signer
      );
    }
  }

  isWeb3Available(): boolean {
    return !!window.ethereum;
  }

  async connect() {
    if (!this.provider) {
      throw new Error("MetaMask is required for this operation");
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      this.signer = await this.provider.getSigner();
      this.updateContract();
      return true;
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      return false;
    }
  }

  async registerInstitution(
    name: string,
    accreditationProof: string,
    requiredVerifiers: number = 3
  ) {
    if (!this.contract || !this.signer) {
      throw new Error("Please connect your wallet to register institution");
    }

    try {
      const tx = await this.contract.registerInstitution(
        name,
        accreditationProof,
        requiredVerifiers
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error registering institution", error);
      return false;
    }
  }

  async verifyInstitution(institutionAddress: string) {
    if (!this.contract || !this.signer) {
      throw new Error("Please connect your wallet to verify institution");
    }

    try {
      const tx = await this.contract.verifyInstitution(institutionAddress);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error verifying institution", error);
      return false;
    }
  }

  async issueBatchCredentials(credentials: BatchCredential[]) {
    if (!this.contract || !this.signer) {
      throw new Error("Please connect your wallet to issue credentials");
    }

    try {
      const tx = await this.contract.issueBatchCredentials(
        credentials.map((c) => ({
          id: ethers.id(c.id),
          credentialHash: c.credentialHash,
          metadataURI: c.metadataURI,
        }))
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error issuing batch credentials", error);
      return false;
    }
  }

  async issueCredential(
    id: string,
    credentialHash: string,
    metadataURI: string
  ) {
    if (!this.contract || !this.signer) {
      throw new Error("Please connect your wallet to issue credentials");
    }

    try {
      const tx = await this.contract.issueCredential(
        ethers.id(id),
        credentialHash,
        metadataURI
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error issuing credential", error);
      return false;
    }
  }

  async verifyCredential(id: string, credentialHash: string) {
    if (!this.contract) {
      throw new Error("Please connect your wallet to verify credentials");
    }

    try {
      const result = await this.contract.verifyCredential(
        ethers.id(id),
        credentialHash
      );
      return {
        isValid: result[0],
        issuer: result[1],
        issueDate: new Date(Number(result[2]) * 1000),
        metadataURI: result[3],
      };
    } catch (error) {
      console.error("Error verifying credential", error);
      return null;
    }
  }

  async verifyBatchCredentials(
    credentials: { id: string; credentialHash: string }[]
  ) {
    if (!this.contract) {
      throw new Error("Please connect your wallet to verify credentials");
    }

    try {
      const results = await Promise.all(
        credentials.map((c) => this.verifyCredential(c.id, c.credentialHash))
      );
      return results.filter((r) => r !== null);
    } catch (error) {
      console.error("Error verifying batch credentials", error);
      return [];
    }
  }

  async getInstitutionDetails(address: string): Promise<Institution | null> {
    if (!this.contract) {
      throw new Error("Please connect your wallet to view institution details");
    }

    try {
      const details = await this.contract.getInstitution(address);
      return {
        address,
        name: details.name,
        verificationStatus: details.status,
        accreditationProof: details.accreditationProof,
        verifiers: details.verifiers,
      };
    } catch (error) {
      console.error("Error getting institution details", error);
      return null;
    }
  }
}

export const web3Service = new Web3Service();
