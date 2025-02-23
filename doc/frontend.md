# Frontend Documentation

## Component Structure

```
src/
├── components/
│   ├── ConnectWallet.tsx
│   ├── CredentialCard.tsx
│   ├── Footer.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── QRScanner.tsx
│   ├── Toast.tsx
│   └── ToastContainer.tsx
├── hooks/
│   ├── useToast.ts
│   └── useWeb3.ts
├── pages/
│   ├── About.tsx
│   ├── Home.tsx
│   ├── Issue.tsx
│   └── Verify.tsx
└── utils/
    └── web3.ts
```

## Key Components

### ConnectWallet
- Web3 wallet integration
- Connection status management
- Error handling

### CredentialCard
- Credential display
- Status indicators
- Metadata linking

### QRScanner
- Camera integration
- QR code detection
- Error handling

## Custom Hooks

### useWeb3
```typescript
const {
  isConnected,
  isConnecting,
  error,
  connect,
  web3Service
} = useWeb3();
```

### useToast
```typescript
const {
  toasts,
  addToast,
  removeToast
} = useToast();
```

## Styling

- Tailwind CSS utilities
- Custom animations
- Responsive design
- Glass morphism effects