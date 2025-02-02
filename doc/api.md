# API Documentation

## Supabase API

### Authentication

#### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});
```

#### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

### Users

#### Create User Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .insert([
    {
      id: 'user_id',
      email: 'user@example.com',
      full_name: 'John Doe',
      user_type: 'student'
    }
  ]);
```

#### Get User Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', 'user_id')
  .single();
```

### Credentials

#### Issue Credential
```typescript
const { data, error } = await supabase
  .from('credentials')
  .insert([
    {
      issuer_id: 'issuer_id',
      recipient_id: 'recipient_id',
      title: 'Degree Title',
      description: 'Description',
      blockchain_tx_hash: 'tx_hash'
    }
  ]);
```

#### Get Credentials
```typescript
const { data, error } = await supabase
  .from('credentials')
  .select(`
    *,
    issuer:users!credentials_issuer_id_fkey(*),
    recipient:users!credentials_recipient_id_fkey(*)
  `)
  .or('issuer_id.eq.user_id,recipient_id.eq.user_id');
```

## Web3 API

### Connect Wallet
```typescript
const address = await web3Service.connect();
```

### Issue Credential
```typescript
const txHash = await web3Service.issueCredential(
  recipientAddress,
  credentialHash
);
```

### Verify Credential
```typescript
const credential = await web3Service.verifyCredential(
  credentialId
);
```

## Response Types

### User
```typescript
type User = {
  id: string;
  email: string;
  full_name: string;
  user_type: string;
  wallet_address: string | null;
};
```

### Credential
```typescript
type Credential = {
  id: string;
  title: string;
  description: string;
  issue_date: string;
  blockchain_tx_hash: string | null;
  issuer: User;
  recipient: User;
};
```

## Error Handling

```typescript
try {
  const result = await apiCall();
} catch (error) {
  if (error instanceof AuthError) {
    // Handle auth errors
  } else if (error instanceof DatabaseError) {
    // Handle database errors
  } else {
    // Handle other errors
  }
}
```

## Rate Limits

- Supabase: Depends on your plan
- Web3: Depends on the network