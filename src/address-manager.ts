import {
	allowlistAbi,
	fixedStrikeOptionTellerAbi,
	fixedStrikeOptionTokenAbi, manualStrikeOLMAbi,
	molmFactoryAbi, olmAbi,
	oolmFactoryAbi, optionTokenAbi, oracleStrikeOLMAbi,
} from "./abis";
import {erc20ABI} from "wagmi";

export type ChainAddresses = {
	FixedStrikeOptionTeller: `0x${string}`,
	MOLMFactory: `0x${string}`,
	OOLMFactory: `0x${string}`
}

export type ChainAbis = {
	ERC20: typeof erc20ABI,
	FixedStrikeOptionTeller: typeof fixedStrikeOptionTellerAbi,
	MOLMFactory: typeof molmFactoryAbi,
	OOLMFactory: typeof oolmFactoryAbi,
	Allowlist: typeof allowlistAbi,
	FixedStrikeOptionToken: typeof fixedStrikeOptionTokenAbi,
	OLM: typeof olmAbi,
	MOLM: typeof manualStrikeOLMAbi,
	OOLM: typeof oracleStrikeOLMAbi,
	OptionToken: typeof optionTokenAbi,
}

export const ADDRESSES: {[index: string]: ChainAddresses} = {
	// Ethereum Mainnet
	[1]: {
		FixedStrikeOptionTeller: "0xF507FE74a1c183836fCd524d46262a091C664072",
		MOLMFactory: "0x3013F6E1193bA63e26E07DF1A57DE6e31164C073",
		OOLMFactory: "0x0013F095eed13bab6f29575748CB954718Fe1223",
	},
	// Ethereum Goerli
	[5]: {
		FixedStrikeOptionTeller: "0xF507FE74a1c183836fCd524d46262a091C664072",
		MOLMFactory: "0x3013F6E1193bA63e26E07DF1A57DE6e31164C073",
		OOLMFactory: "0x0013F095eed13bab6f29575748CB954718Fe1223",
	},
	// Arbitrum Mainnet
	[42161]: {
		FixedStrikeOptionTeller: "0xF507FE74a1c183836fCd524d46262a091C664072",
		MOLMFactory: "0x3013F6E1193bA63e26E07DF1A57DE6e31164C073",
		OOLMFactory: "0x0013F095eed13bab6f29575748CB954718Fe1223",
	},
	// Arbitrum Goerli
	[421613]: {
		FixedStrikeOptionTeller: "0xF507FE74a1c183836fCd524d46262a091C664072",
		MOLMFactory: "0x3013F6E1193bA63e26E07DF1A57DE6e31164C073",
		OOLMFactory: "0x0013F095eed13bab6f29575748CB954718Fe1223",
	},
}

export const ABIS: {[index: string]: ChainAbis} = {
	// Ethereum Mainnet
	[1]: {
		ERC20: erc20ABI,
		FixedStrikeOptionTeller: fixedStrikeOptionTellerAbi,
		MOLMFactory: molmFactoryAbi,
		OOLMFactory: oolmFactoryAbi,
		Allowlist: allowlistAbi,
		FixedStrikeOptionToken: fixedStrikeOptionTokenAbi,
		OLM: olmAbi,
		MOLM: manualStrikeOLMAbi,
		OOLM: oracleStrikeOLMAbi,
		OptionToken: optionTokenAbi,
	},
	// Ethereum Goerli
	[5]: {
		ERC20: erc20ABI,
		FixedStrikeOptionTeller: fixedStrikeOptionTellerAbi,
		MOLMFactory: molmFactoryAbi,
		OOLMFactory: oolmFactoryAbi,
		Allowlist: allowlistAbi,
		FixedStrikeOptionToken: fixedStrikeOptionTokenAbi,
		OLM: olmAbi,
		MOLM: manualStrikeOLMAbi,
		OOLM: oracleStrikeOLMAbi,
		OptionToken: optionTokenAbi,
	},
	// Arbitrum Mainnet
	[42161]: {
		ERC20: erc20ABI,
		FixedStrikeOptionTeller: fixedStrikeOptionTellerAbi,
		MOLMFactory: molmFactoryAbi,
		OOLMFactory: oolmFactoryAbi,
		Allowlist: allowlistAbi,
		FixedStrikeOptionToken: fixedStrikeOptionTokenAbi,
		OLM: olmAbi,
		MOLM: manualStrikeOLMAbi,
		OOLM: oracleStrikeOLMAbi,
		OptionToken: optionTokenAbi,
	},
	// Arbitrum Goerli
	[421613]: {
		ERC20: erc20ABI,
		FixedStrikeOptionTeller: fixedStrikeOptionTellerAbi,
		MOLMFactory: molmFactoryAbi,
		OOLMFactory: oolmFactoryAbi,
		Allowlist: allowlistAbi,
		FixedStrikeOptionToken: fixedStrikeOptionTokenAbi,
		OLM: olmAbi,
		MOLM: manualStrikeOLMAbi,
		OOLM: oracleStrikeOLMAbi,
		OptionToken: optionTokenAbi,
	}
}