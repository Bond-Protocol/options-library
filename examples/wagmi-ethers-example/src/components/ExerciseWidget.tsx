import React, {useEffect, useState} from 'react';
import {PublicClient, WalletClient} from 'viem';
import {
    getAbisForChain,
    getAddressesForChain,
    olmTokenList,
    oTokenData
} from '../../../../src/functions';
import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";

type ExerciseWidgetProps = {
    publicClient: PublicClient,
    walletClient: WalletClient,
    address: `0x${string}`
}

export const ExerciseWidget = (props: ExerciseWidgetProps) => {
    const [oTokens, setOTokens] = useState<OLMTokenBalance[]>([]);

    const [selected, setSelected] = useState<boolean>(false);
    const [oTokenAddress, setOTokenAddress] = useState<string>("Select oToken");
    const [oTokenDecimals, setOTokenDecimals] = useState<number>(0);
    const [oTokenSymbol, setOTokenSymbol] = useState<string>("Select oToken");
    const [quoteTokenSymbol, setQuoteTokenSymbol] = useState<string>("---");
    const [payoutTokenSymbol, setPayoutTokenSymbol] = useState<string>("---");

    const [amountToExercise, setAmountToExercise] = useState<string>("0");
    const [decimalAdjustedStrikePrice, setDecimalAdjustedStrikePrice] = useState<string>("0");
    const [quoteToken, setQuoteToken] = useState<`0x${string}`>();
    const [approvalAmount, setApprovalAmount] = useState<bigint>();

    const exerciseAmount = !isNaN(Number(amountToExercise))
        ? BigInt(Number(amountToExercise) * Math.pow(10, oTokenDecimals))
        : BigInt(0);

    const hasWalletClient: boolean = (props.walletClient && props.walletClient.chain) != null;

    const {config: approveConfig} = usePrepareContractWrite({
        address: quoteToken,
        // @ts-ignore
        abi: hasWalletClient && getAbisForChain(props.walletClient.chain?.id).ERC20Abi,
        functionName: 'approve',
        args: [
            // @ts-ignore
            hasWalletClient && getAddressesForChain(props.walletClient.chain?.id).FixedStrikeOptionTeller,
            approvalAmount?.toString()
        ],
        enabled: hasWalletClient
    });

    const {
        data: approveData,
        isLoading: isApproveLoading,
        isSuccess: isApproveSuccess,
        write: approveWrite,
        reset: approveReset
    } = useContractWrite(approveConfig);

    const waitForApproveTransaction = useWaitForTransaction({
        hash: approveData?.hash,
    });

    const {config: exerciseConfig} = usePrepareContractWrite({
        // @ts-ignore
        address: hasWalletClient && getAddressesForChain(props.walletClient.chain?.id).FixedStrikeOptionTeller,
        // @ts-ignore
        abi: hasWalletClient && getAbisForChain(props.walletClient.chain?.id).FixedStrikeOptionTellerAbi,
        functionName: 'exercise',
        args: [
            oTokenAddress,
            exerciseAmount?.toString()
        ],
        enabled: waitForApproveTransaction.isSuccess
    });

    const {
        data: exerciseData,
        isLoading: isExerciseLoading,
        isSuccess: isExerciseSuccess,
        write: exerciseWrite,
        reset: exerciseReset
    } = useContractWrite(exerciseConfig);

    const waitForExerciseTransaction = useWaitForTransaction({
        hash: exerciseData?.hash,
    });

    useEffect(() => {
        approveReset();
        exerciseReset();
    }, [waitForExerciseTransaction.isSuccess, waitForExerciseTransaction.isError]);

    const getOlmTokenList = () => olmTokenList(props.address, props.publicClient).then(res => setOTokens(res));
    const setOTokenData = (oToken: `0x{string}`) => oTokenData(oToken, props.publicClient, props.walletClient).then(res => {
        setOTokenSymbol(res.symbol);
        setOTokenDecimals(res.decimals);
        setOTokenAddress(oToken);
        setPayoutTokenSymbol(res.payoutTokenSymbol);
        setQuoteTokenSymbol(res.quoteTokenSymbol);
        setDecimalAdjustedStrikePrice(res.decimalAdjustedStrike);
        setSelected(true);
        setQuoteToken(res.quoteToken);
        setApprovalAmount(res.strikePrice * BigInt(amountToExercise));
        setAmountToExercise(res.decimalAdjustedBalance);
    });

    return (
        <div id="widget" className="grid grid-rows-4 gap-0 border-2 m-2 rounded">
            <div id="option-token" className="flex flex-col m-2">
                <p id="option-token-label" className="font-bold m-0 px-2">Option Token to Exercise</p>
                <div id="option-token-input" className="flex flex-row p-2 m-0">
                    <input type="number"
                           disabled={!selected}
                           value={amountToExercise}
                           className="grow input input-primary text-right"
                           onChange={(e) => {
                               setAmountToExercise(e.target.value);
                           }}/>
                    <button className="flex-none w-32 ml-1 rounded-full btn-primary btn-md"
                            onClick={() => {
                                getOlmTokenList();
                                // @ts-ignore
                                window.my_modal_1.showModal();
                            }}>
                        {oTokenSymbol}
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">oTokens created by OLM</h3>
                            {oTokens.length > 0 &&
                                <div className="modal-action flex flex-col">
                                    {oTokens.map((oToken, idx) =>
                                        <div key={idx} className="flex flex-row m-2">
                                            <label className="flex-none w-20">Epoch: {idx}</label>
                                            <button className="btn-md btn-neutral"
                                                // @ts-ignore
                                                    onClick={() => setOTokenData(oToken)
                                                    }>{oToken}</button>
                                        </div>
                                    )}
                                    <button className="btn">Close</button>
                                </div>
                            }
                            {oTokens.length === 0 &&
                                <div className="modal-action flex flex-col">
                                    Loading oTokens...
                                    <button className="btn">Close</button>
                                </div>
                            }
                        </form>
                    </dialog>
                </div>
                <p className="m-0 p-0 text-center">+</p>
            </div>

            <div id="quote" className="flex flex-col m-2">
                <div id="quote-header" className="flex flex-row">
                    <p className="grow m-0 px-2 font-bold">Pay</p>
                    {selected ? <p className="m-0 px-2 justify-self-end">Strike
                            Price: {decimalAdjustedStrikePrice.toLocaleString()} {quoteTokenSymbol} per {payoutTokenSymbol}</p>
                        : <p className="m-0 px-2 justify-self-end"></p>}
                    <p className="m-0 px-2 w-32"></p>
                </div>
                <div id="quote-input" className="flex flex-row p-2">
                    <input type="text" disabled={true}
                           value={Number(amountToExercise) * Number(decimalAdjustedStrikePrice)}
                           className="grow input text-right"/>
                    <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
                        {quoteTokenSymbol}
                    </button>
                </div>
                <p className="m-0 p-0 text-center">↓</p>
            </div>
            <div id="payout" className="flex flex-col m-2">
                <div id="payout-header" className="flex flex-row">
                    <p className="grow m-0 px-2 font-bold">Receive</p>
                </div>
                <div id="payout-input" className="flex flex-row p-2">
                    <input type="text" disabled={true} value={amountToExercise} className="grow input text-right"/>
                    <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
                        {payoutTokenSymbol}
                    </button>
                </div>
            </div>
            {!waitForApproveTransaction.isSuccess &&
                <div id="action" className="text-center">
                    {selected && isApproveSuccess && !waitForApproveTransaction.isSuccess &&
                        <button className="btn w-3/4 btn-primary"
                                disabled={true}
                        >Transaction Pending...</button>
                    }
                    {selected && isApproveLoading &&
                        <button className="btn w-3/4 btn-secondary"
                                disabled={true}
                        >Check Wallet</button>
                    }
                    {selected && !isApproveLoading && !isApproveSuccess &&
                        <button className="btn w-3/4 btn-secondary"
                                onClick={() => {
                                    approveWrite && approveWrite();
                                }
                                }>Approve {quoteTokenSymbol}</button>
                    }
                </div>
            }
            {waitForApproveTransaction.isSuccess &&
                <div id="action" className="text-center">
                    {isExerciseSuccess && !waitForExerciseTransaction.isSuccess &&
                        <button className="btn w-3/4 btn-primary"
                                disabled={true}
                        >Transaction Pending...</button>
                    }
                    {isExerciseLoading &&
                        <button className="btn w-3/4 btn-secondary"
                                disabled={true}
                        >Check Wallet</button>
                    }
                    {!isExerciseLoading && !isExerciseSuccess &&
                        <button className="btn w-3/4 btn-primary"
                                onClick={() => {
                                    exerciseWrite && exerciseWrite()
                                }}>Exercise</button>
                    }
                </div>
            }
        </div>
    );

};