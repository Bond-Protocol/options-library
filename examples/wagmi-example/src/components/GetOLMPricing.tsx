import {useState} from 'react'
import {usePublicClient} from 'wagmi'
import {olmPricing} from "../../../../src/functions";
import {goerli} from "wagmi/chains";

export function GetOLMPricing() {
    const publicClient = usePublicClient(goerli);
    const [address, setAddress] = useState<`0x${string}`>("0xb9fa19fc77fab92d90b0a010fbe7b22b045e5dd9")
    const [payoutPrice, setPayoutPrice] = useState<number>(10.58)
    const [quotePrice, setQuotePrice] = useState<number>(1)
    const [stakedPrice, setStakedPrice] = useState<number>(7.44)

    const [result, setResult] = useState();

    const getOlmPricing = async () => olmPricing(
        address,
        payoutPrice,
        quotePrice,
        stakedPrice,
        publicClient
    ).then(res => setResult(res))

    return (
        <div>

            <div className="flex flex-col m-2">
                <label>OLM Address</label>
                <input
                    onChange={(e) => setAddress(e.target.value)}
                    style={{marginLeft: 4}}
                    value={address}
                />
                <label>Payout Price</label>
                <input
                    onChange={(e) => setPayoutPrice(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={payoutPrice}
                />
                <label>Quote Price</label>
                <input
                    onChange={(e) => setQuotePrice(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={quotePrice}
                />
                <label>Staked Price</label>
                <input
                    onChange={(e) => setStakedPrice(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={stakedPrice}
                />
                <button onClick={() => getOlmPricing()}>Fetch</button>
            </div>
            <br />
            {result &&
                <div className="m-2">
                    Strike Price: ${result.strikePriceUSD}
                    <br/>
                    Option Token Implied Value: ${result.impliedValue}
                    <br/>
                    Staked Token Balance: {result.stakedTokenBalance}
                    <br/>
                    Reward Rate (oTokens per day): {result.rewardRate}
                    <br/>
                    Epoch Duration (days): {result.epochDuration / 86400}
                    <br/>
                    Epoch ROI: {result.epochRoi}%
                    <br/>
                    Epochs per Year: {result.epochsPerYear}
                    <br/>
                    APR: {result.apr}%
                    <br/>
                </div>
            }
        </div>
    )
}
