# ElimuChain - Secure Academic Credential Verification

ElimuChain is an innovative platform aimed at transforming academic credential verification in Kenya. By harnessing the power of both the **Lisk blockchain** for scalable sidechain functionality and **Solidity** for smart contract execution on the Ethereum Virtual Machine (EVM), we are dedicated to combating educational fraud, streamlining verification processes, and fostering trust in academic qualifications.

**Target Audience**:

- Educational Institutions (Universities, Colleges, Schools)
- Students and Graduates
- Employers
- Government Bodies
- International Educational Partners

## Functionality

ElimuChain offers key functionalities:

- **Credential Issuance**: Institutions can issue digital certificates via Solidity smart contracts, recorded on the blockchain.
- **Verification**: Employers or authorized parties can verify credentials instantly using smart contract functions with unique certificate IDs.
- **Data Privacy**: Users maintain control over their data through blockchain's cryptographic methods.
- **Interoperability**: Designed for seamless integration with existing educational systems.

## Unique Features

- **Hybrid Blockchain Approach**: Combines Lisk's scalability with Ethereum's Solidity for robust and secure backend operations.
- **User Empowerment**: Students have direct control over their educational data, managing access permissions through smart contracts.
- **Cultural Adaptation**: Specifically tailored to meet the needs of the Kenyan educational context.
- **Anti-Fraud Mechanism**: The immutable nature of blockchain ensures the integrity of issued credentials.

## Installation

### Tech Stack:

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum, Solidity
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Web3**: ethers.js
- **UI Components**: Lucide React

### Steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ElimuChain/elimuchain
   cd elimuchain
   ```

2. **Install Node Dependencies**:

   ```bash
   npm install
   ```

3. **Install Solidity Dependencies**:

   - Ensure Truffle is installed globally:

   ```bash
   npm install -g truffle
   ```

   - Install project-specific Solidity dependencies:

   ```bash
   truffle compile
   ```

4. **Configure Lisk Node & Ethereum Environment**:

   - Edit `config.json` for Lisk node settings.
   - Set up your local Ethereum network or use an existing testnet.

5. **Start the Node**:
   ```bash
   npm run start
   ```
    
For development mode:

```bash
npm run dev
```

## Usage

### For Educational Institutions:

Deploy and interact with the `CertificateIssuer` contract:

```solidity
contract CertificateIssuer {
    function issueCertificate(address student, string memory course, string memory institution) public;
    // Additional functions...
}
```

### For Employers or Verifiers:

Verify credentials using the `CertificateVerifier` contract:

```solidity
contract CertificateVerifier {
    function verifyCertificate(uint certificateId) public view returns (bool);
}
```

### For Students:

Access your certificates through the frontend or directly interact with contracts.

## Documentation

Detailed documentation can be found in the [/doc](/doc) directory:

- [Setup Guide](/doc/setup.md)
- [Architecture Overview](/doc/architecture.md)
- [Smart Contract Documentation](/doc/smart-contract.md)
- [API Documentation](/doc/api.md)
- [User Guide](/doc/user-guide.md)

## Contributing

We welcome contributions to enhance ElimuChain! Here’s how you can help:
Please read our [Contributing Guidelines](/doc/CONTRIBUTING.md) before submitting pull requests.
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a pull request.

Please ensure your code adheres to our standards and passes all tests. Refer to our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
