import {
	allowlistAbi,
	fixedStrikeOptionTellerAbi,
	fixedStrikeOptionTokenAbi, manualStrikeOLMAbi,
	molmFactoryAbi, olmAbi,
	oolmFactoryAbi, optionTokenAbi, oracleStrikeOLMAbi,
	rolesAuthorityAbi
} from "./abis";
import {erc20ABI} from "wagmi";

export type ChainAddresses = {
	RolesAuthority: `0x${string}`,
	FixedStrikeOptionTeller: `0x${string}`,
	MOLMFactory: `0x${string}`,
	OOLMFactory: `0x${string}`
}

export type ChainAbis = {
	ERC20Abi: typeof erc20ABI,
	RolesAuthorityAbi: typeof rolesAuthorityAbi,
	FixedStrikeOptionTellerAbi: typeof fixedStrikeOptionTellerAbi,
	MOLMFactoryAbi: typeof molmFactoryAbi,
	OOLMFactoryAbi: typeof oolmFactoryAbi,
	AllowlistAbi: typeof allowlistAbi,
	FixedStrikeOptionTokenAbi: typeof fixedStrikeOptionTokenAbi,
	OLMAbi: typeof olmAbi,
	MOLMAbi: typeof manualStrikeOLMAbi,
	OOLMAbi: typeof oracleStrikeOLMAbi,
	OptionTokenAbi: typeof optionTokenAbi,
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

export const ABIS: {[index: string]: ChainAbis} = {
	// Ethereum Mainnet
	[1]: {
		ERC20Abi: erc20ABI,
		RolesAuthorityAbi: rolesAuthorityAbi,
		FixedStrikeOptionTellerAbi: fixedStrikeOptionTellerAbi,
		MOLMFactoryAbi: molmFactoryAbi,
		OOLMFactoryAbi: oolmFactoryAbi,
		AllowlistAbi: allowlistAbi,
		FixedStrikeOptionTokenAbi: fixedStrikeOptionTokenAbi,
		OLMAbi: olmAbi,
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	},
	// Ethereum Goerli
	[5]: {
		ERC20Abi: erc20ABI,
		RolesAuthorityAbi: rolesAuthorityAbi,
		FixedStrikeOptionTellerAbi: fixedStrikeOptionTellerAbi,
		MOLMFactoryAbi: molmFactoryAbi,
		OOLMFactoryAbi: oolmFactoryAbi,
		AllowlistAbi: allowlistAbi,
		FixedStrikeOptionTokenAbi: fixedStrikeOptionTokenAbi,
		OLMAbi: olmAbi,
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	},
	// Optimism Mainnet
	[10]: {
		ERC20Abi: erc20ABI,
		RolesAuthorityAbi: rolesAuthorityAbi,
		FixedStrikeOptionTellerAbi: fixedStrikeOptionTellerAbi,
		MOLMFactoryAbi: molmFactoryAbi,
		OOLMFactoryAbi: oolmFactoryAbi,
		AllowlistAbi: allowlistAbi,
		FixedStrikeOptionTokenAbi: fixedStrikeOptionTokenAbi,
		OLMAbi: olmAbi,
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	},
	// Arbitrum Mainnet
	[42161]: {
		ERC20Abi: erc20ABI,
		RolesAuthorityAbi: rolesAuthorityAbi,
		FixedStrikeOptionTellerAbi: fixedStrikeOptionTellerAbi,
		MOLMFactoryAbi: molmFactoryAbi,
		OOLMFactoryAbi: oolmFactoryAbi,
		AllowlistAbi: allowlistAbi,
		FixedStrikeOptionTokenAbi: fixedStrikeOptionTokenAbi,
		OLMAbi: olmAbi,
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	},
	// Arbitrum Goerli
	[421613]: {
		ERC20Abi: erc20ABI,
		RolesAuthorityAbi: rolesAuthorityAbi,
		FixedStrikeOptionTellerAbi: fixedStrikeOptionTellerAbi,
		MOLMFactoryAbi: molmFactoryAbi,
		OOLMFactoryAbi: oolmFactoryAbi,
		AllowlistAbi: allowlistAbi,
		FixedStrikeOptionTokenAbi: fixedStrikeOptionTokenAbi,
		OLMAbi: olmAbi,
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	}
}