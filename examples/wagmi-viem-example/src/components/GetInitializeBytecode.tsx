import {useState} from "react";
import {getMOLMInitializeBytecode} from "../../../../src/functions";

export function GetInitializeBytecode() {
    const [quoteTokenAddress, setQuoteTokenAddress] = useState<`0x${string}`>();
    const [timeUntilEligible, setTimeUntilEligible] = useState<number>();
    const [eligibleDuration, setEligibleDuration] = useState<number>();
    const [receiver, setReceiver] = useState<`0x${string}`>();
    const [epochDuration, setEpochDuration] = useState<number>();
    const [epochTransitionReward, setEpochTransitionReward] = useState<string>();
    const [rewardRate, setRewardRate] = useState<string>();
    const [allowlistAddress, setAllowlistAddress] = useState<`0x${string}`>();
    const [allowlistParams, setAllowlistParams] = useState<string>();
    const [other, setOther] = useState<any>();
    const [bytecode, setBytecode] = useState<string>()

    return (
        <div>
            <div className="flex flex-col p-2">
                <label>Quote Token Address</label>
                <input
                    onChange={(e) => setQuoteTokenAddress(e.target.value)}
                    style={{marginLeft: 4}}
                    value={quoteTokenAddress}
                />
                <br />
                <label>Time Until Eligible</label>
                <input
                    onChange={(e) => setTimeUntilEligible(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={timeUntilEligible}
                />
                <br />
                <label>Eligible Duration</label>
                <input
                    onChange={(e) => setEligibleDuration(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={eligibleDuration}
                />
                <br />
                <label>Receiver</label>
                <input
                    onChange={(e) => setReceiver(e.target.value)}
                    style={{marginLeft: 4}}
                    value={receiver}
                />
                <br />
                <label>Epoch Duration</label>
                <input
                    onChange={(e) => setEpochDuration(Number(e.target.value))}
                    type="number"
                    style={{marginLeft: 4}}
                    value={epochDuration}
                />
                <br />
                <label>Epoch Transition Reward</label>
                <input
                    onChange={(e) => setEpochTransitionReward(e.target.value)}
                    style={{marginLeft: 4}}
                    value={epochTransitionReward}
                />
                <br />
                <label>Reward Rate</label>
                <input
                    onChange={(e) => setRewardRate(e.target.value)}
                    style={{marginLeft: 4}}
                    value={rewardRate}
                />
                <br />
                <label>Allowlist Address</label>
                <input
                    onChange={(e) => setAllowlistAddress(e.target.value)}
                    style={{marginLeft: 4}}
                    value={allowlistAddress}
                />
                <br />
                <label>Allowlist Params</label>
                <input
                    onChange={(e) => setAllowlistParams(e.target.value)}
                    style={{marginLeft: 4}}
                    value={allowlistParams}
                />
                <br />
                <label>Other</label>
                <input
                    onChange={(e) => setOther(Number(e.target.value))}
                    style={{marginLeft: 4}}
                    value={other}
                />
                <br />
                <button onClick={() => {
                    setBytecode(
                        getMOLMInitializeBytecode(
                            quoteTokenAddress,
                            timeUntilEligible,
                            eligibleDuration,
                            receiver,
                            epochDuration,
                            epochTransitionReward,
                            rewardRate,
                            allowlistAddress,
                            allowlistParams,
                            other
                        )
                    );
                }}>Get Bytecode</button>
            </div>
            <br/>
            {bytecode}
        </div>
    );
}