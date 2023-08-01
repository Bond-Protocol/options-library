export type ChainAddresses = {
	RolesAuthority: `0x${string}`,
	FixedStrikeOptionTeller: `0x${string}`,
	MOLMFactory: `0x${string}`,
	OOLMFactory: `0x${string}`
}

export const ADDRESSES: {[index: string]: ChainAddresses} = {
	// Ethereum Mainnet
	[1]: {
		RolesAuthority: '0xa596f274CBDEF6e3A916D53E0B7AF8988119F343',
		FixedStrikeOptionTeller: "0x5C9448c52760Be7E650380e3c635972E8182C6F4",
		MOLMFactory: "0xFd6A1211906E067C684725fBc665ec5EDea7d15A",
		OOLMFactory: "0x92e2653Ec44BDe44a1EB35314550b9F81c81D6aF",
	},
	// Ethereum Goerli
	[5]: {
		RolesAuthority: '0xa596f274CBDEF6e3A916D53E0B7AF8988119F343',
		FixedStrikeOptionTeller: "0x5C9448c52760Be7E650380e3c635972E8182C6F4",
		MOLMFactory: "0xFd6A1211906E067C684725fBc665ec5EDea7d15A",
		OOLMFactory: "0x92e2653Ec44BDe44a1EB35314550b9F81c81D6aF",
	},
	// Optimism Mainnet
	[10]: {
		RolesAuthority: '0xa596f274CBDEF6e3A916D53E0B7AF8988119F343',
		FixedStrikeOptionTeller: "0x5C9448c52760Be7E650380e3c635972E8182C6F4",
		MOLMFactory: "0xFd6A1211906E067C684725fBc665ec5EDea7d15A",
		OOLMFactory: "0x92e2653Ec44BDe44a1EB35314550b9F81c81D6aF",
	},
	// Arbitrum Mainnet
	[42161]: {
		RolesAuthority: '0xa596f274CBDEF6e3A916D53E0B7AF8988119F343',
		FixedStrikeOptionTeller: "0x5C9448c52760Be7E650380e3c635972E8182C6F4",
		MOLMFactory: "0xFd6A1211906E067C684725fBc665ec5EDea7d15A",
		OOLMFactory: "0x92e2653Ec44BDe44a1EB35314550b9F81c81D6aF",
	},
	// Arbitrum Goerli
	[421613]: {
		RolesAuthority: '0xa596f274CBDEF6e3A916D53E0B7AF8988119F343',
		FixedStrikeOptionTeller: "0x5C9448c52760Be7E650380e3c635972E8182C6F4",
		MOLMFactory: "0xFd6A1211906E067C684725fBc665ec5EDea7d15A",
		OOLMFactory: "0x92e2653Ec44BDe44a1EB35314550b9F81c81D6aF",
	},
}