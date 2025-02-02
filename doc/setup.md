# Setup Guide

This guide will walk you through setting up ElimuChain for development.

## Prerequisites

- Node.js 16+
- npm or yarn
- MetaMask browser extension
- Supabase account
- Git

## Development Setup

### 1. Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ElimuChain/elimuchain.git 
   cd elimuchain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables file:
   ```bash
   cp .env.example .env
   ```

### 2. Supabase Configuration

1. Create a new Supabase project
2. Get your project URL and anon key from the project settings
3. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the database migrations:
   ```sql
   -- Available in supabase/migrations/
   ```

### 3. Smart Contract Deployment

1. Deploy the ElimuChain smart contract:
   ```bash
   # Using your preferred deployment method (Hardhat, Truffle, etc.)
   ```

2. Add the contract address to `.env`:
   ```
   VITE_CONTRACT_ADDRESS=your_contract_address
   ```

### 4. Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

## Testing

Run the test suite:
```bash
npm run test
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting provider

## Common Issues

### MetaMask Connection

If you're having issues with MetaMask:
1. Ensure MetaMask is installed
2. Connect to the correct network
3. Unlock your wallet

### Supabase Connection

If Supabase connection fails:
1. Verify your environment variables
2. Check if the database is accessible
3. Ensure RLS policies are correctly configured