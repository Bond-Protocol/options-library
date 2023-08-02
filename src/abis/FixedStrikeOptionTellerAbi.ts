export const fixedStrikeOptionTellerAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "guardian_",
                "type": "address"
            },
            {
                "internalType": "contract Authority",
                "name": "authority_",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "CreateFail",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "value",
                "type": "bytes"
            }
        ],
        "name": "Teller_InvalidParams",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Teller_NotAuthorized",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint48",
                "name": "eligible",
                "type": "uint48"
            }
        ],
        "name": "Teller_NotEligible",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint48",
                "name": "expiry",
                "type": "uint48"
            }
        ],
        "name": "Teller_NotExpired",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint48",
                "name": "expiry",
                "type": "uint48"
            }
        ],
        "name": "Teller_OptionExpired",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Teller_PriceOutOfBounds",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "optionHash",
                "type": "bytes32"
            }
        ],
        "name": "Teller_TokenDoesNotExist",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "Teller_UnsupportedToken",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "contract Authority",
                "name": "newAuthority",
                "type": "address"
            }
        ],
        "name": "AuthorityUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract FixedStrikeOptionToken",
                "name": "optionToken",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "contract ERC20",
                "name": "payoutToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "contract ERC20",
                "name": "quoteToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint48",
                "name": "eligible",
                "type": "uint48"
            },
            {
                "indexed": true,
                "internalType": "uint48",
                "name": "expiry",
                "type": "uint48"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "call",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "strikePrice",
                "type": "uint256"
            }
        ],
        "name": "OptionTokenCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "referrer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "payout",
                "type": "uint256"
            }
        ],
        "name": "WroteOption",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "FEE_DECIMALS",
        "outputs": [
            {
                "internalType": "uint48",
                "name": "",
                "type": "uint48"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "authority",
        "outputs": [
            {
                "internalType": "contract Authority",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ERC20[]",
                "name": "tokens_",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to_",
                "type": "address"
            }
        ],
        "name": "claimFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "optionToken_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "create",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ERC20",
                "name": "payoutToken_",
                "type": "address"
            },
            {
                "internalType": "contract ERC20",
                "name": "quoteToken_",
                "type": "address"
            },
            {
                "internalType": "uint48",
                "name": "eligible_",
                "type": "uint48"
            },
            {
                "internalType": "uint48",
                "name": "expiry_",
                "type": "uint48"
            },
            {
                "internalType": "address",
                "name": "receiver_",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "call_",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "strikePrice_",
                "type": "uint256"
            }
        ],
        "name": "deploy",
        "outputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "optionToken_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "exercise",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "optionToken_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "exerciseCost",
        "outputs": [
            {
                "internalType": "contract ERC20",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ERC20",
                "name": "",
                "type": "address"
            }
        ],
        "name": "fees",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ERC20",
                "name": "payoutToken_",
                "type": "address"
            },
            {
                "internalType": "contract ERC20",
                "name": "quoteToken_",
                "type": "address"
            },
            {
                "internalType": "uint48",
                "name": "eligible_",
                "type": "uint48"
            },
            {
                "internalType": "uint48",
                "name": "expiry_",
                "type": "uint48"
            },
            {
                "internalType": "address",
                "name": "receiver_",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "call_",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "strikePrice_",
                "type": "uint256"
            }
        ],
        "name": "getOptionToken",
        "outputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ERC20",
                "name": "payoutToken_",
                "type": "address"
            },
            {
                "internalType": "contract ERC20",
                "name": "quoteToken_",
                "type": "address"
            },
            {
                "internalType": "uint48",
                "name": "eligible_",
                "type": "uint48"
            },
            {
                "internalType": "uint48",
                "name": "expiry_",
                "type": "uint48"
            },
            {
                "internalType": "address",
                "name": "receiver_",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "call_",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "strikePrice_",
                "type": "uint256"
            }
        ],
        "name": "getOptionTokenHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minOptionDuration",
        "outputs": [
            {
                "internalType": "uint48",
                "name": "",
                "type": "uint48"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "optionTokenImplementation",
        "outputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "optionTokens",
        "outputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "protocolFee",
        "outputs": [
            {
                "internalType": "uint48",
                "name": "",
                "type": "uint48"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract FixedStrikeOptionToken",
                "name": "optionToken_",
                "type": "address"
            }
        ],
        "name": "reclaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract Authority",
                "name": "newAuthority",
                "type": "address"
            }
        ],
        "name": "setAuthority",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint48",
                "name": "duration_",
                "type": "uint48"
            }
        ],
        "name": "setMinOptionDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint48",
                "name": "fee_",
                "type": "uint48"
            }
        ],
        "name": "setProtocolFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;