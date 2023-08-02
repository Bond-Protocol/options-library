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
        stakedTokenBalance: decimalAdjustedTotalBalance,
        rewardRate: decimalAdjustedRewardRate,
        epochRoi: epochRoi,
        epochDuration: epochDuration,
        epochsPerYear: epochsPerYear,
        apr: apr
    };
}

export async function olmTokenList(
    olmAddress: `0x${string}`,
    publicClient: PublicClient
) {
    const olmContract = getContract({
        address: olmAddress,
        abi: olmAbi,
        publicClient
    });

    const epoch = await olmContract.read.epoch();
    console.log(epoch);

    // Iterate from epoch 1 to current epoch and collect list of oTokens
    let oTokens = [];
    for (let i = 1; i <= epoch; i++) {
        const optionToken = await olmContract.read.epochOptionTokens([i]);
        oTokens.push(optionToken);
    }

    return oTokens;
}

export async function oTokenData(
    oTokenAddress: `0x${string}`,
    publicClient: PublicClient
) {
    const oTokenContract = getContract({
        address: oTokenAddress,
        abi: fixedStrikeOptionTokenAbi,
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
        symbol
    ] = await Promise.all([
        oTokenContract.read.name(),
        oTokenContract.read.symbol()
    ]);

    const payoutTokenContract = getContract({
        address: payoutToken,
        abi: IERC20Abi,
        publicClient
    });

    const quoteTokenContract = getContract({
        address: quoteToken,
        abi: IERC20Abi,
        publicClient
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

    const decimalAdjustedStrike = formatUnits(
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
        quoteTokenDecimals,
        strikePrice: decimalAdjustedStrike,
        eligibleTime,
        expiryTime,
        call
    };

}