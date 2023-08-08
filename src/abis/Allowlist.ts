export const allowlist = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id_',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
    ],
    name: 'isAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'proof_',
        type: 'bytes',
      },
    ],
    name: 'isAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id_',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'params_',
        type: 'bytes',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params_',
        type: 'bytes',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
