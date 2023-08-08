import {encodeFunctionData, formatUnits, getContract, PublicClient, toHex} from "viem";
import {WalletClient} from "viem";
import {ABIS, ADDRESSES, ChainAbis, ChainAddresses} from "./address-manager";

/*
    Returns a ChainAddresses object, containing the addresses of contracts
    deployed on the specified chain.
*/
export function getAddressesForChain(chainId: number): ChainAddresses {
    const addresses: ChainAddresses = ADDRESSES[chainId];
    if (!addresses) throw new Error("Unsupported Chain");
    return addresses;
}

/*
    Returns a ChainAbis object, containing the abis of contracts
    on the specified chain.

    NOTE: At the time of writing, ABIs will be identical across all chains,
    this is included in case future upgrades are deployed on some chains but
    not others.
*/
export function getAbisForChain(chainId: number): ChainAbis {
    const abis: ChainAbis = ABIS[chainId];
    if (!abis) throw new Error("Unsupported Chain");
    return abis;
}

/*
    Hex encodes the provided parameters in the correct format for the OLM's initialize
    function. This is compatible with both MOLM and OOLM contracts.
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
    allowlistParams: string = "",
    other: string = "",
    chainId: number
): `0x${string}` {
    return encodeFunctionData({
        abi: getAbisForChain(chainId).OLMAbi,
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
            toHex(allowlistParams, {size: 32}),
            toHex(other, {size: 32}),
        ],
    });
}

function getAbis(publicClient: PublicClient): ChainAbis {
    const chainId: number | undefined = publicClient.chain?.id;
    if (!chainId) throw new Error("No chain detected");
    const abis: ChainAbis = getAbisForChain(chainId);
    if (!abis) throw new Error(`Unsupported chain id: ${chainId}`);

    return abis;
}

export type OLMPricing = {
    strikePriceUSD: number,
    impliedValue: number,
    stakedTokenBalance: string,
    rewardRate: string,
    epochRoi: number,
    epochDuration: number,
    epochsPerYear: number,
    apr: number
}

/*
    Calculates OLM pricing information which is commonly required for
    front end displays.
*/
export async function olmPricing(
    olmAddress: `0x${string}`,
    payoutPriceUSD: number,
    quotePriceUSD: number,
    stakedTokenPriceUSD: number,
    publicClient: PublicClient
): Promise<OLMPricing> {
    const abis: ChainAbis = getAbis(publicClient);

    const olmContract = getContract({
        address: olmAddress,
        abi: abis.OLMAbi,
        publicClient
    });

    const [
        quoteToken,
        stakedToken,
        epochDuration,
        epoch,
        rewardRate,
        stakedTokenBalance
    ] = await Promise.all([
        olmContract.read.quoteToken(),
        olmContract.read.stakedToken(),
        olmContract.read.epochDuration(),
        olmContract.read.epoch(),
        olmContract.read.rewardRate(),
        olmContract.read.totalBalance()
    ]);

    const optionToken: `0x${string}` = await olmContract.read.epochOptionTokens([epoch]);

    const quoteTokenContract = getContract({
        address: quoteToken,
        abi: abis.ERC20Abi,
        publicClient
    });

    const stakedTokenContract = getContract({
        address: stakedToken,
        abi: abis.ERC20Abi,
        publicClient
    });

    const optionTokenContract = getContract({
        address: optionToken,
        abi: abis.FixedStrikeOptionTokenAbi,
        publicClient
    });

    const [
        quoteTokenDecimals,
        stakedTokenDecimals,
        optionTokenDecimals,
        strikePrice
    ] = await Promise.all([
        quoteTokenContract.read.decimals(),
        stakedTokenContract.read.decimals(),
        optionTokenContract.read.decimals(),
        optionTokenContract.read.strike()
    ]);

    const decimalAdjustedStrike: string = formatUnits(
        strikePrice, quoteTokenDecimals
    );

    const strikePriceUSD: number = Number(decimalAdjustedStrike) * quotePriceUSD;
    const impliedValue: number = payoutPriceUSD - strikePriceUSD;

    const decimalAdjustedRewardRate: string = formatUnits(
        rewardRate, optionTokenDecimals
    );

    const decimalAdjustedTotalBalance: string = formatUnits(
        stakedTokenBalance, stakedTokenDecimals
    );

    const rewardRatePerToken: number =
        Number(decimalAdjustedRewardRate) / Number(decimalAdjustedTotalBalance);

    const epochRewardValue: number = Number(rewardRatePerToken) * impliedValue;
    const epochDurationInDays: number = epochDuration / 60 / 60 / 24;
    const epochRoi: number = (epochRewardValue / stakedTokenPriceUSD) * epochDurationInDays * 100;
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
        apr: apr
    };
}

/*
    Returns a list of addresses for Option Tokens created by an OLM, in order of epoch.
*/
export async function olmTokenList(
    olmAddress: `0x${string}`,
    publicClient: PublicClient
): Promise<string[]> {
    const abis: ChainAbis = getAbis(publicClient);

    const olmContract = getContract({
        address: olmAddress,
        abi: abis.OLMAbi,
        publicClient
    });

    const epoch: number = await olmContract.read.epoch();

    // Iterate from epoch 1 to current epoch and collect list of oTokens
    let oTokens = [];
    for (let i = 1; i <= epoch; i++) {
        const optionToken: `0x${string}` = await olmContract.read.epochOptionTokens([i]);
        oTokens.push(optionToken);
    }

    return oTokens;
}

export type OTokenData = {
    name: string;
    symbol: string;
    decimals: number;
    payoutTokenName: string;
    payoutTokenSymbol: string;
    payoutTokenDecimals: number;
    quoteTokenName: string;
    quoteTokenSymbol: string;
    strikePrice: bigint;
    decimalAdjustedStrike: string;
    eligibleTime: number;
    expiryTime: number;
    call: boolean;
    quoteToken: `0x${string}`;
    balance: bigint;
    decimalAdjustedBalance: string;
}

/*
    Gathers Option Token data commonly required by front end displays.
*/
export async function oTokenData(
    oTokenAddress: `0x${string}`,
    publicClient: PublicClient,
    walletClient: WalletClient
): Promise<OTokenData> {
    const abis: ChainAbis = getAbis(publicClient);

    const oTokenContract = getContract({
        address: oTokenAddress,
        abi: abis.FixedStrikeOptionTokenAbi,
        publicClient
    });

    const [
        decimals,
        payoutToken,
        quoteToken,
        eligibleTime,
        expiryTime,
        ,
        call,
        strikePrice
    ] = await oTokenContract.read.getOptionParameters();

    const [
        name,
        symbol,
        balance
    ] = await Promise.all([
        oTokenContract.read.name(),
        oTokenContract.read.symbol(),
        walletClient && walletClient.account
            ? oTokenContract.read.balanceOf([
                walletClient.account?.address
            ])
            : BigInt(0)
    ]);

    const decimalAdjustedBalance: string = formatUnits(balance, decimals);

    const payoutTokenContract = getContract({
        address: payoutToken,
        abi: abis.ERC20Abi,
        publicClient
    });

    const quoteTokenContract = getContract({
        address: quoteToken,
        abi: abis.ERC20Abi,
        publicClient,
        walletClient
    });

    const [
        payoutTokenName,
        payoutTokenSymbol,
        payoutTokenDecimals,
        quoteTokenName,
        quoteTokenSymbol,
        quoteTokenDecimals
    ] = await Promise.all([
        payoutTokenContract.read.name(),
        payoutTokenContract.read.symbol(),
        payoutTokenContract.read.decimals(),
        quoteTokenContract.read.name(),
        quoteTokenContract.read.symbol(),
        quoteTokenContract.read.decimals()
    ]);

    const decimalAdjustedStrike: string = formatUnits(
        strikePrice, quoteTokenDecimals
    );

    return {
        name,
        symbol,
        decimals,
        payoutTokenName,
        payoutTokenSymbol,
        payoutTokenDecimals,
        quoteTokenName,
        quoteTokenSymbol,
        strikePrice,
        decimalAdjustedStrike,
        eligibleTime,
        expiryTime,
        call,
        quoteToken,
        balance,
        decimalAdjustedBalance
    };
}