import { useState } from 'react';
import { getOLMPricing } from '../../../../src/helpers';
import { PublicClient } from 'viem';
import { OLMPricing } from '../../../../src/types';

type GetOLMPricingProps = {
  address: `0x${string}`;
  publicClient: PublicClient;
};

export function GetOLMPricing(props: GetOLMPricingProps) {
  const [payoutPrice, setPayoutPrice] = useState<number>(10.58);
  const [quotePrice, setQuotePrice] = useState<number>(1);
  const [stakedPrice, setStakedPrice] = useState<number>(7.44);

  const [result, setResult] = useState<OLMPricing>();

  const getOlmPricing = async () =>
    getOLMPricing(
      props.address,
      payoutPrice,
      quotePrice,
      stakedPrice,
      props.publicClient,
    ).then((res) => setResult(res));

  return (
    <div>
      <div className="flex flex-col m-2">
        <label>Payout Price</label>
        <input
          onChange={(e) => setPayoutPrice(Number(e.target.value))}
          type="number"
          style={{ marginLeft: 4 }}
          value={payoutPrice}
        />
        <label>Quote Price</label>
        <input
          onChange={(e) => setQuotePrice(Number(e.target.value))}
          type="number"
          style={{ marginLeft: 4 }}
          value={quotePrice}
        />
        <label>Staked Price</label>
        <input
          onChange={(e) => setStakedPrice(Number(e.target.value))}
          type="number"
          style={{ marginLeft: 4 }}
          value={stakedPrice}
        />
        <button onClick={() => getOlmPricing()}>Fetch</button>
      </div>
      <br />
      {result && (
        <div className="m-2">
          Strike Price: ${result.strikePriceUSD}
          <br />
          Option Token Implied Value: ${result.impliedValue}
          <br />
          Staked Token Balance: {result.stakedTokenBalance}
          <br />
          Reward Rate (oTokens per day): {result.rewardRate}
          <br />
          Epoch Duration (days): {result.epochDuration / 86400}
          <br />
          Epoch ROI: {result.epochRoi}%
          <br />
          Epochs per Year: {result.epochsPerYear}
          <br />
          APR: {result.apr}%
          <br />
        </div>
      )}
    </div>
  );
}
