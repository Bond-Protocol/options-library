export const MOLMFactory = [
  {
    inputs: [
      {
        internalType: 'contract IFixedStrikeOptionTeller',
        name: 'optionTeller_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'contract ERC20',
        name: 'stakedToken_',
        type: 'address',
      },
      { internalType: 'contract ERC20', name: 'payoutToken_', type: 'address' },
    ],
    name: 'deploy',
    outputs: [
      { internalType: 'contract ManualStrikeOLM', name: '', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'optionTeller',
    outputs: [
      {
        internalType: 'contract IFixedStrikeOptionTeller',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
