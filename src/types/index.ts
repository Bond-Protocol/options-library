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

export type ChainAddresses = {
  FixedStrikeOptionTeller: `0x${string}`;
  MOLMFactory: `0x${string}`;
  OOLMFactory: `0x${string}`;
};

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

export type Token = {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
};

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
