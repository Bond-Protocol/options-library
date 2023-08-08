import { ChainAbis, ChainAddresses } from './types';
import {
  allowlist,
  fixedStrikeOptionTeller,
  fixedStrikeOptionToken,
  IERC20,
  manualStrikeOLM,
  MOLMFactory,
  OLM,
  OOLMFactory,
  optionToken,
  oracleStrikeOLM,
} from './abis';

export const ADDRESSES: { [index: string]: ChainAddresses } = {
  // Ethereum Mainnet
  [1]: {
    FixedStrikeOptionTeller: '0xF507FE74a1c183836fCd524d46262a091C664072',
    MOLMFactory: '0x3013F6E1193bA63e26E07DF1A57DE6e31164C073',
    OOLMFactory: '0x0013F095eed13bab6f29575748CB954718Fe1223',
  },
  // Ethereum Goerli
  [5]: {
    FixedStrikeOptionTeller: '0xF507FE74a1c183836fCd524d46262a091C664072',
    MOLMFactory: '0x3013F6E1193bA63e26E07DF1A57DE6e31164C073',
    OOLMFactory: '0x0013F095eed13bab6f29575748CB954718Fe1223',
  },
  // Arbitrum Mainnet
  [42161]: {
    FixedStrikeOptionTeller: '0xF507FE74a1c183836fCd524d46262a091C664072',
    MOLMFactory: '0x3013F6E1193bA63e26E07DF1A57DE6e31164C073',
    OOLMFactory: '0x0013F095eed13bab6f29575748CB954718Fe1223',
  },
  // Arbitrum Goerli
  [421613]: {
    FixedStrikeOptionTeller: '0xF507FE74a1c183836fCd524d46262a091C664072',
    MOLMFactory: '0x3013F6E1193bA63e26E07DF1A57DE6e31164C073',
    OOLMFactory: '0x0013F095eed13bab6f29575748CB954718Fe1223',
  },
};

export const ABIS: { [index: string]: ChainAbis } = {
  // Ethereum Mainnet
  [1]: {
    ERC20: IERC20,
    FixedStrikeOptionTeller: fixedStrikeOptionTeller,
    MOLMFactory: MOLMFactory,
    OOLMFactory: OOLMFactory,
    Allowlist: allowlist,
    FixedStrikeOptionToken: fixedStrikeOptionToken,
    OLM: OLM,
    MOLM: manualStrikeOLM,
    OOLM: oracleStrikeOLM,
    OptionToken: optionToken,
  },
  // Ethereum Goerli
  [5]: {
    ERC20: IERC20,
    FixedStrikeOptionTeller: fixedStrikeOptionTeller,
    MOLMFactory: MOLMFactory,
    OOLMFactory: OOLMFactory,
    Allowlist: allowlist,
    FixedStrikeOptionToken: fixedStrikeOptionToken,
    OLM: OLM,
    MOLM: manualStrikeOLM,
    OOLM: oracleStrikeOLM,
    OptionToken: optionToken,
  },
  // Arbitrum Mainnet
  [42161]: {
    ERC20: IERC20,
    FixedStrikeOptionTeller: fixedStrikeOptionTeller,
    MOLMFactory: MOLMFactory,
    OOLMFactory: OOLMFactory,
    Allowlist: allowlist,
    FixedStrikeOptionToken: fixedStrikeOptionToken,
    OLM: OLM,
    MOLM: manualStrikeOLM,
    OOLM: oracleStrikeOLM,
    OptionToken: optionToken,
  },
  // Arbitrum Goerli
  [421613]: {
    ERC20: IERC20,
    FixedStrikeOptionTeller: fixedStrikeOptionTeller,
    MOLMFactory: MOLMFactory,
    OOLMFactory: OOLMFactory,
    Allowlist: allowlist,
    FixedStrikeOptionToken: fixedStrikeOptionToken,
    OLM: OLM,
    MOLM: manualStrikeOLM,
    OOLM: oracleStrikeOLM,
    OptionToken: optionToken,
  },
};
