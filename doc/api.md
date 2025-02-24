# API Documentation

## Web3 Service API

### Initialization
```typescript
const web3Service = new Web3Service();
```

### Methods

#### Connect Wallet
```typescript
async connect(): Promise<boolean>
```

#### Issue Credential
```typescript
async issueCredential(
  id: string,
  credentialHash: string,
  metadataURI: string
): Promise<boolean>
```

#### Verify Credential
```typescript
async verifyCredential(
  id: string,
  credentialHash: string
): Promise<{
  isValid: boolean;
  issuer: string;
  issueDate: Date;
  metadataURI: string;
} | null>
```

## Error Handling

All API methods include proper error handling and return appropriate error messages or null values when operations fail.

## Response Types

```typescript
interface CredentialVerification {
  isValid: boolean;
  issuer: string;
  issueDate: Date;
  metadataURI: string;
}
```