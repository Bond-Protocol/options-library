import {
  encodeFunctionData,
  formatUnits,
  getContract,
  PublicClient,
  toHex,
} from 'viem';
import { ABIS, ADDRESSES } from './address-manager';
import {
  ChainAbis,
  ChainAddresses,
  OLMPricing,
  OTokenData,
  Token,
} from './types';

/**
 *  Gets the addresses of pre-deployed contracts for the Option system on the specified chain.
 *
 *  At launch, these should be identical across all chains, but this is included in case they
 *  diverge for some reason in the future.
 *
 * @param chainId (number) - the chain id to get addresses for.
 *
 * @return ChainAddresses object, containing the addresses of contracts deployed on the specified chain.
 */
export function getAddressesForChain(chainId: number): ChainAddresses {
  const addresses: ChainAddresses = ADDRESSES[chainId];
  if (!addresses) throw new Error('Unsupported Chain');
  return addresses;
}

/**
 * Gets the ABIs of Option system contracts on the specified chain.
 *
 * At launch, these should be identical across all chains, but this is included in case they
 * diverge for some reason in the future.
 *
 * @param chainId (number) - the chain id to get ABIs for.
 *
 * @return ChainAbis object containing the ABIs of contracts deployed on the specified chain.
 */
export function getAbisForChain(chainId: number): ChainAbis {
  const abis: ChainAbis = ABIS[chainId];
  if (!abis) throw new Error('Unsupported Chain');
  return abis;
}

/**
 * Hex encodes the provided parameters in the correct format for the OLM's initialize function.
 * This is compatible with both MOLM and OOLM contracts.
 *
 * @param quoteTokenAddress (0x${string}) - Token that stakers must pay to exercise the call options they receive.
 * @param timeUntilEligible (number) - Amount of time (in seconds) from option token deployment to when it can be exercised.
 * @param eligibleDuration (number) - Amount of time (in seconds) from when the option token is eligible to when it expires.
 * @param receiver (0x${string}) - Address that will receive the quote tokens when an option is exercised IMPORTANT: receiver is the only address that can retrieve payout token collateral from expired options. It must be able to call the reclaim function on the Option Teller contract.
 * @param epochDuration (number) - Staking epoch duration (in seconds).
 * @param epochTransitionReward (number) - Amount of option tokens that are rewarded for starting a new epoch.
 * @param rewardRate (string) - Amount of option tokens rewarded per reward period (1 day).
 * @param allowlistAddress (0x${string}) - Address of the allowlist contract that can be used to restrict who can stake in the OLM contract. If the zero address, then no allow list is used.
 * @param allowlistParams (string) - Parameters that are passed to the allowlist contract when this contract registers with it.
 * @param other (string) - Additional parameters that are required by specific implementations of the OLM contract.
 * @param chainId (number) - The chain id on which the transaction will be executed.
 *
 * @return 0x${string} consisting of the hex-encoded bytecode for the OLM initialize function.
 *         This can be copied and executed manually.
 */
export function getOLMInitializeBytecode(
  quoteTokenAddress: `0x${string}`,
  timeUntilEligible: number,
  eligibleDuration: number,
  receiver: `0x${string}`,
  epochDuration: number,
  epochTransitionReward: string,
  rewardRate: string,
  allowlistAddress: `0x${string}`,
  allowlistParams: string = '',
  other: string = '',
  chainId: number,
): `0x${string}` {
  return encodeFunctionData({
    abi: getAbisForChain(chainId).OLM,
    functionName: 'initialize',
    args: [
      quoteTokenAddress,
      timeUntilEligible,
      eligibleDuration,
      receiver,
      epochDuration,
      BigInt(epochTransitionReward),
      BigInt(rewardRate),
      allowlistAddress,
      toHex(allowlistParams, { size: 32 }),
      toHex(other, { size: 32 }),
    ],
  });
}

function getAbis(publicClient: PublicClient): ChainAbis {
  const chainId: number | undefined = publicClient.chain?.id;
  if (!chainId) throw new Error('No chain detected');
  const abis: ChainAbis = getAbisForChain(chainId);
  if (!abis) throw new Error(`Unsupported chain id: ${chainId}`);

  return abis;
}

/**
 * Calculates OLM pricing information which is commonly required for front end displays.
 *
 * @param olmAddress (0x${string}) - Address of the OLM contract to get pricing for.
 * @param payoutPriceUSD (number) - The current price of the Payout Token in USD.
 * @param quotePriceUSD (number) - The current price of the Quote Token in USD.
 * @param stakedTokenPriceUSD (number) - The current price of the Staked Token in USD.
 * @param publicClient (PublicClient) - A Viem PublicClient.
 *
 * @return Promise<OLMPricing> containing pricing data for the specified OLM.
 */
export async function getOLMPricing(
  olmAddress: `0x${string}`,
  payoutPriceUSD: number,
  quotePriceUSD: number,
  stakedTokenPriceUSD: number,
  publicClient: PublicClient,
): Promise<OLMPricing> {
  const abis: ChainAbis = getAbis(publicClient);

  const olmContract = getContract({
    address: olmAddress,
    abi: abis.OLM,
    publicClient,
  });

  const [
    quoteToken,
    stakedToken,
    epochDuration,
    epoch,
    rewardRate,
    stakedTokenBalance,
  ] = await Promise.all([
    olmContract.read.quoteToken(),
    olmContract.read.stakedToken(),
    olmContract.read.epochDuration(),
    olmContract.read.epoch(),
    olmContract.read.rewardRate(),
    olmContract.read.totalBalance(),
  ]);

  const optionToken: `0x${string}` = await olmContract.read.epochOptionTokens([
    epoch,
  ]);

  const quoteTokenContract = getContract({
    address: quoteToken,
    abi: abis.ERC20,
    publicClient,
  });

  const stakedTokenContract = getContract({
    address: stakedToken,
    abi: abis.ERC20,
    publicClient,
  });

  const optionTokenContract = getContract({
    address: optionToken,
    abi: abis.FixedStrikeOptionToken,
    publicClient,
  });

  const [
    quoteTokenDecimals,
    stakedTokenDecimals,
    optionTokenDecimals,
    strikePrice,
  ] = await Promise.all([
    quoteTokenContract.read.decimals(),
    stakedTokenContract.read.decimals(),
    optionTokenContract.read.decimals(),
    optionTokenContract.read.strike(),
  ]);

  const decimalAdjustedStrike: string = formatUnits(
    strikePrice,
    quoteTokenDecimals,
  );

  const strikePriceUSD: number = Number(decimalAdjustedStrike) * quotePriceUSD;
  const impliedValue: number = payoutPriceUSD - strikePriceUSD;

  const decimalAdjustedRewardRate: string = formatUnits(
    rewardRate,
    optionTokenDecimals,
  );

  const decimalAdjustedTotalBalance: string = formatUnits(
    stakedTokenBalance,
    stakedTokenDecimals,
  );

  const rewardRatePerToken: number =
    Number(decimalAdjustedRewardRate) / Number(decimalAdjustedTotalBalance);

  const epochRewardValue: number = Number(rewardRatePerToken) * impliedValue;
  const epochDurationInDays: number = epochDuration / 60 / 60 / 24;
  const epochRoi: number =
    (epochRewardValue / stakedTokenPriceUSD) * epochDurationInDays * 100;
  const epochsPerYear: number = 365 / epochDurationInDays;
  const apr: number = epochRoi * epochsPerYear;

  return {
    strikePriceUSD: strikePriceUSD,
    impliedValue: impliedValue,
    stakedTokenBalance: decimalAdjustedTotalBalance,
    rewardRate: decimalAdjustedRewardRate,
    epochRoi: epochRoi,
    epochDuration: epochDuration,
    epochsPerYear: epochsPerYear,
    apr: apr,
  };
}

/**
 * Returns a list of addresses for Option Tokens created by an OLM, in order of epoch.
 *
 * @param olmAddress (0x${string}) - Address of the OLM contract to get a token list for.
 * @param publicClient (PublicClient) - A Viem PublicClient.
 *
 * @return Promise<string[]> containing a list of addresses for Option Tokens created by the specified OLM, in order of epoch.
 */
export async function getOLMTokenList(
  olmAddress: `0x${string}`,
  publicClient: PublicClient,
): Promise<string[]> {
  const abis: ChainAbis = getAbis(publicClient);

  const olmContract = getContract({
    address: olmAddress,
    abi: abis.OLM,
    publicClient,
  });

  const epoch: number = await olmContract.read.epoch();

  // Iterate from epoch 1 to current epoch and collect list of oTokens
  let oTokens = [];
  for (let i = 1; i <= epoch; i++) {
    const optionToken: `0x${string}` = await olmContract.read.epochOptionTokens(
      [i],
    );
    oTokens.push(optionToken);
  }

  return oTokens;
}

/**
 * Gathers Option Token data commonly required by front end displays.
 *
 * @param oTokenAddress (0x${string}) - Address of the Option Token to get data for.
 * @param publicClient (PublicClient) - A Viem PublicClient.
 * @param userAddress (0x${string}) [OPTIONAL] - The address of a user to check Option Token balances for. If not provided, a balance of 0 will be returned for all Option Tokens.
 *
 * @return Promise<OTokenData> containing data commonly required by frontend displays.
 */
export async function getOTokenData(
  oTokenAddress: `0x${string}`,
  publicClient: PublicClient,
  userAddress?: `0x${string}`,
): Promise<OTokenData> {
  const abis: ChainAbis = getAbis(publicClient);

  const oTokenContract = getContract({
    address: oTokenAddress,
    abi: abis.FixedStrikeOptionToken,
    publicClient,
  });

  const [
    decimals,
    payoutTokenAddress,
    quoteTokenAddress,
    eligibleTime,
    expiryTime,
    ,
    call,
    strikePrice,
  ] = await oTokenContract.read.getOptionParameters();

  const [name, symbol, balance] = await Promise.all([
    oTokenContract.read.name(),
    oTokenContract.read.symbol(),
    userAddress ? oTokenContract.read.balanceOf([userAddress]) : BigInt(0),
  ]);

  const optionToken: Token = {
    address: oTokenAddress,
    name: name,
    symbol: symbol,
    decimals: decimals,
  };

  const decimalAdjustedBalance: string = formatUnits(balance, decimals);

  const payoutTokenContract = getContract({
    address: payoutTokenAddress,
    abi: abis.ERC20,
    publicClient,
  });

  const quoteTokenContract = getContract({
    address: quoteTokenAddress,
    abi: abis.ERC20,
    publicClient,
  });

  const [
    payoutTokenName,
    payoutTokenSymbol,
    payoutTokenDecimals,
    quoteTokenName,
    quoteTokenSymbol,
    quoteTokenDecimals,
  ] = await Promise.all([
    payoutTokenContract.read.name(),
    payoutTokenContract.read.symbol(),
    payoutTokenContract.read.decimals(),
    quoteTokenContract.read.name(),
    quoteTokenContract.read.symbol(),
    quoteTokenContract.read.decimals(),
  ]);

  const payoutToken: Token = {
    address: payoutTokenAddress,
    name: payoutTokenName,
    symbol: payoutTokenSymbol,
    decimals: payoutTokenDecimals,
  };

  const quoteToken: Token = {
    address: quoteTokenAddress,
    name: quoteTokenName,
    symbol: quoteTokenSymbol,
    decimals: quoteTokenDecimals,
  };

  const decimalAdjustedStrike: string = formatUnits(
    strikePrice,
    quoteTokenDecimals,
  );

  return {
    optionToken,
    payoutToken,
    quoteToken,
    strikePrice,
    decimalAdjustedStrike,
    eligibleTime,
    expiryTime,
    call,
    balance,
    decimalAdjustedBalance,
  };
}
