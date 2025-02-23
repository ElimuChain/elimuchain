# Deployment Guide

## Prerequisites

- Node.js 16+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Access to an Ethereum network (mainnet, testnet, or local)

## Smart Contract Deployment

1. **Compile Contract**
   ```bash
   npx hardhat compile
   ```

2. **Deploy Contract**
   ```bash
   npx hardhat run scripts/deploy.js --network <network>
   ```

3. **Update Contract Address**
   - Copy the deployed contract address
   - Update `ELIMUCHAIN_CONTRACT_ADDRESS` in `src/utils/web3.ts`

## Frontend Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Deploy to Hosting Service**
   - Netlify (recommended)
   - Vercel
   - GitHub Pages

## Environment Setup

1. Create `.env` file:
   ```
   VITE_CONTRACT_ADDRESS=<contract_address>
   VITE_NETWORK_ID=<network_id>
   ```

## Post-Deployment

1. Verify smart contract on Etherscan
2. Test all functionality
3. Monitor for any issues
4. Update documentation if needed