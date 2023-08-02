import {formatUnits, getContract, PublicClient} from "viem";
import {fixedStrikeOptionTokenAbi, olmAbi} from "./abis";
import {IERC20Abi} from "./abis/IERC20";

export async function olmPricing(
    olmAddress: `0x${string}`,
    payoutPriceUSD: number,
    quotePriceUSD: number,
    stakedTokenPriceUSD: number,
    publicClient: PublicClient
) {
    const olmContract = getContract({
        address: olmAddress,
        abi: olmAbi,
        publicClient
    });

    const [
        quote,
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

    const optionToken = await olmContract.read.epochOptionTokens([epoch]);

    const quoteTokenContract = getContract({
        address: quote,
        abi: IERC20Abi,
        publicClient
    });

    const stakedTokenContract = getContract({
        address: stakedToken,
        abi: IERC20Abi,
        publicClient
    });

    const optionTokenContract = getContract({
        address: optionToken,
        abi: fixedStrikeOptionTokenAbi,
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

    const decimalAdjustedStrike = formatUnits(
        strikePrice, quoteTokenDecimals
    );

    const strikePriceUSD = Number(decimalAdjustedStrike) * quotePriceUSD;
    const impliedValue = payoutPriceUSD - strikePriceUSD;

    const decimalAdjustedRewardRate = formatUnits(
        rewardRate, optionTokenDecimals
    );

    const decimalAdjustedTotalBalance = formatUnits(
        stakedTokenBalance, stakedTokenDecimals
    );

    const rewardRatePerToken =
        Number(decimalAdjustedRewardRate) / Number(decimalAdjustedTotalBalance);

    const epochRewardValue = Number(rewardRatePerToken) * impliedValue;
    const epochDurationInDays = epochDuration / 60 / 60 / 24;
    const epochRoi = (epochRewardValue / stakedTokenPriceUSD) * epochDurationInDays * 100;
    const epochsPerYear  = 365 / epochDurationInDays;
    const apr = epochRoi * epochsPerYear;

    return {
        strikePriceUSD: strikePriceUSD,
        impliedValue: impliedValue,
        epochRoi: epochRoi,
        epochDuration: epochDuration,
        epochsPerYear: epochsPerYear,
        apr: apr
    };
}