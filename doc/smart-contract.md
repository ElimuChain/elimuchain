# Smart Contract Documentation

## ElimuChain Smart Contract

The ElimuChain smart contract manages the issuance and verification of academic credentials on the Ethereum blockchain.

### Contract Overview

```solidity
contract ElimuChain {
    struct Credential {
        address issuer;
        address recipient;
        string credentialHash;
        uint256 timestamp;
        bool isValid;
    }
}
```

### Key Features

1. **Credential Issuance**
2. **Verification System**
3. **Institution Management**

## Functions

### issueCredential

Issues a new academic credential on the blockchain.

```solidity
function issueCredential(
    address recipient,
    string memory credentialHash
) external onlyVerifiedInstitution
```

**Parameters**:
- `recipient`: Address of the credential recipient
- `credentialHash`: IPFS hash or other identifier of the credential

### verifyCredential

Verifies a credential's authenticity.

```solidity
function verifyCredential(bytes32 id)
    external
    view
    returns (
        address issuer,
        address recipient,
        string memory credentialHash,
        uint256 timestamp,
        bool isValid
    )
```

**Parameters**:
- `id`: Unique identifier of the credential

### verifyInstitution

Verifies an educational institution.

```solidity
function verifyInstitution(address institution) external
```

**Parameters**:
- `institution`: Address of the institution to verify

## Events

```solidity
event CredentialIssued(
    bytes32 indexed id,
    address indexed issuer,
    address indexed recipient,
    string credentialHash,
    uint256 timestamp
);

event InstitutionVerified(address institution);
```

## Security Considerations

1. **Access Control**
   - onlyVerifiedInstitution modifier
   - Institution verification system

2. **Data Integrity**
   - Immutable credential records
   - Timestamp validation

3. **Upgrade Path**
   - Consider proxy pattern for upgrades
   - Data migration strategy

## Gas Optimization

1. Efficient data storage
2. Batch operations where possible
3. Minimal on-chain data

## Testing

```javascript
describe("ElimuChain", function() {
  it("Should issue credential", async function() {
    // Test code
  });
  
  it("Should verify credential", async function() {
    // Test code
  });
});
```

## Deployment

1. **Prerequisites**
   - Ethereum node
   - Development environment
   - Test ETH

2. **Steps**
   ```bash
   # Deploy contract
   # Verify contract
   # Initialize parameters
   ```

## Integration

```typescript
// TypeScript integration example
const contract = new ethers.Contract(
    address,
    ElimuChainABI,
    signer
);

await contract.issueCredential(recipient, hash);
```