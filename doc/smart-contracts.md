# Smart Contract Documentation

## ElimuChain Smart Contract

The core smart contract that manages credential issuance and verification.

### Structure

```solidity
struct Credential {
    string credentialHash;
    address issuer;
    uint256 issueDate;
    bool isValid;
    string metadataURI;
}
```

### Key Functions

#### Issuing Credentials
```solidity
function issueCredential(
    bytes32 id,
    string memory credentialHash,
    string memory metadataURI
) public onlyAuthorizedIssuer
```

#### Verifying Credentials
```solidity
function verifyCredential(
    bytes32 id,
    string memory credentialHash
) public view returns (bool, address, uint256, string memory)
```

### Events

```solidity
event CredentialIssued(bytes32 indexed id, address indexed issuer, string credentialHash);
event IssuerAuthorized(address indexed issuer);
event IssuerRevoked(address indexed issuer);
event CredentialRevoked(bytes32 indexed id);
```

### Access Control

- Owner privileges
- Authorized issuers
- Public verification

### Gas Optimization

- Efficient data structures
- Minimal storage usage
- Optimized function calls