import {
	allowlistAbi,
	fixedStrikeOptionTellerAbi,
	fixedStrikeOptionTokenAbi, manualStrikeOLMAbi,
	molmFactoryAbi,
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
	ERC20Abi: any,
	RolesAuthorityAbi: any,
	FixedStrikeOptionTellerAbi: any,
	MOLMFactoryAbi: any,
	OOLMFactoryAbi: any,
	AllowlistAbi: any,
	FixedStrikeOptionTokenAbi: any,
	MOLMAbi: any,
	OOLMAbi: any,
	OptionTokenAbi: any,
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
		MOLMAbi: manualStrikeOLMAbi,
		OOLMAbi: oracleStrikeOLMAbi,
		OptionTokenAbi: optionTokenAbi,
	}
}