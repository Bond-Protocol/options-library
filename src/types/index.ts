import {
  allowlist,
  fixedStrikeOptionTeller,
  fixedStrikeOptionToken,
  manualStrikeOLM,
  MOLMFactory,
  OLM,
  OOLMFactory,
  optionToken,
  oracleStrikeOLM,
  IERC20,
} from '../abis';

/**
 * Contains the addresses of the pre-deployed contracts used by the Option system.
 */
export type ChainAddresses = {
  FixedStrikeOptionTeller: `0x${string}`;
  MOLMFactory: `0x${string}`;
  OOLMFactory: `0x${string}`;
};

/**
 * Contains the ABIs of the contracts used by the Option system.
 */
export type ChainAbis = {
  ERC20: typeof IERC20;
  FixedStrikeOptionTeller: typeof fixedStrikeOptionTeller;
  MOLMFactory: typeof MOLMFactory;
  OOLMFactory: typeof OOLMFactory;
  Allowlist: typeof allowlist;
  FixedStrikeOptionToken: typeof fixedStrikeOptionToken;
  OLM: typeof OLM;
  MOLM: typeof manualStrikeOLM;
  OOLM: typeof oracleStrikeOLM;
  OptionToken: typeof optionToken;
};

/**
 * Contains pricing data for an OLM.
 */
export type OLMPricing = {
  strikePriceUSD: number;
  impliedValue: number;
  stakedTokenBalance: string;
  rewardRate: string;
  epochRoi: number;
  epochDuration: number;
  epochsPerYear: number;
  apr: number;
};

/**
 * Contains the basic data for an ERC-20 token.
 */
export type Token = {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
};

/**
 * Contains data for an Option Token which is commonly required by frontend displays.
 */
export type OTokenData = {
  optionToken: Token;
  payoutToken: Token;
  quoteToken: Token;
  strikePrice: bigint;
  decimalAdjustedStrike: string;
  eligibleTime: number;
  expiryTime: number;
  call: boolean;
  balance: bigint;
  decimalAdjustedBalance: string;
};
