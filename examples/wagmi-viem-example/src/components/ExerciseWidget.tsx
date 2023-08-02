import React, { useState } from 'react';
import {PublicClient} from 'viem';
import { olmTokenList, oTokenData } from '../../../../src/functions';



const OptionTokenModal:React.FC = () => {


    return (
        <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            </div>
        </form>
        </dialog>
    );
}


export const ExerciseWidget = (props: {publicClient: PublicClient, address: `0x${string}`}) => {

    const [oTokens, setoTokens] = useState<string[]>([]);

    const [selected, setSelected] = useState<boolean>(false);
    const [approved, setApproved] = useState<boolean>(false);
    const [oTokenSymbol, setOTokenSymbol] = useState<string>("Select oToken");
    const [quoteTokenSymbol, setQuoteTokenSymbol] = useState<string>("---");
    const [payoutTokenSymbol, setPayoutTokenSymbol] = useState<string>("---");

    const [amountToExercise, setAmountToExercise] = useState<number>(0);
    const [strikePrice, setStrikePrice] = useState<number>(0);

    const handleSelected = () => {
        if (selected) {
            setOTokenSymbol("Select oToken");
            setQuoteTokenSymbol("---");
            setPayoutTokenSymbol("---");
            setAmountToExercise(0);
            setStrikePrice(0);
        } else {
            setOTokenSymbol("oBPS");
            setQuoteTokenSymbol("ETH");
            setPayoutTokenSymbol("BPS");
            setAmountToExercise(0);
            setStrikePrice(0.01);
        }
        setSelected(!selected);
    }

    const getOlmTokenList = () => olmTokenList(props.address, props.publicClient).then(res => setoTokens(res));
    const setoTokenData = (oToken: `0x{string}`) => oTokenData(oToken, props.publicClient).then(res => {
        setOTokenSymbol(res.symbol);
        setPayoutTokenSymbol(res.payoutTokenSymbol);
        setQuoteTokenSymbol(res.quoteTokenSymbol);
        setStrikePrice(res.strikePrice);
        setSelected(true);
    });

    return (
        <div id="widget" className="grid grid-rows-4 gap-0 border-2 m-2 rounded">
            <div id="option-token" className="flex flex-col m-2">
                <p id="option-token-label" className="font-bold m-0 px-2">Option Token to Exercise</p>
                <div id="option-token-input" className="flex flex-row p-2 m-0">
                    <input type="text" disabled={!selected} value={amountToExercise} className="grow input input-primary text-right" onChange={(e) => {
                        setAmountToExercise(parseFloat(e.target.value));
                    }}/>
                    <button className="flex-none w-32 ml-1 rounded-full btn-primary btn-md" onClick={()=>{
                        getOlmTokenList();
                        window.my_modal_1.showModal();
                    }}>
                        {oTokenSymbol}
                    </button>
                    <dialog id="my_modal_1" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">oTokens created by OLM</h3>
                        <div className="modal-action flex flex-col">
                        { oTokens.map((oToken, idx) => 
                            <div key={idx} className="flex flex-row m-2">
                                <label className="flex-none w-20">Epoch: {idx}</label>
                                <button className="btn-md btn-neutral" onClick={()=>setoTokenData(oToken)}>{oToken}</button>
                            </div>
                        )}
                        {/* if there is a button in form, it will close the modal */}
                        {/* <button className="btn">Close</button> */}
                        </div>
                    </form>
                    </dialog>
                </div>
                <p className="m-0 p-0 text-center">+</p>
            </div>
            
            <div id="quote" className="flex flex-col m-2">
                <div id="quote-header" className="flex flex-row">
                    <p className="grow m-0 px-2 font-bold">Pay</p>
                    {selected ? <p className="m-0 px-2 justify-self-end">Strike Price: {strikePrice.toLocaleString()} {quoteTokenSymbol} per {payoutTokenSymbol}</p>
                        : <p className="m-0 px-2 justify-self-end"></p>}
                    <p className="m-0 px-2 w-32"></p>
                </div>
                <div id="quote-input" className="flex flex-row p-2">
                    <input type="text" disabled={true} value={amountToExercise * strikePrice} className="grow input text-right"/>
                    {selected ? <button className="flex-none w-32 ml-1 rounded-full btn-primary btn-disabled btn-md">
                        {quoteTokenSymbol}
                    </button> :
                    <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
                        {quoteTokenSymbol}
                    </button>}
                </div>
                <p className="m-0 p-0 text-center">↓</p>
            </div>
            <div id="payout" className="flex flex-col m-2">
                <div id="payout-header" className="flex flex-row">
                    <p className="grow m-0 px-2 font-bold">Receive</p>
                </div>
                <div id="payout-input" className="flex flex-row p-2">
                    <input type="text" disabled={true} value={amountToExercise} className="grow input text-right"/>
                    {selected ? <button className="flex-none w-32 ml-1 rounded-full btn-primary btn-disabled btn-md">
                        {payoutTokenSymbol}
                    </button> :
                    <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
                        {payoutTokenSymbol}
                    </button>}
                </div>
            </div>
            <div id="action" className="text-center">
                {selected ? (approved ?
                    <button className="btn w-3/4 btn-primary" onClick={() => {
                        setApproved(false);
                    }}>Exercise</button> :
                    <button className="btn w-3/4 btn-secondary" onClick={() => {
                        setApproved(true);
                    }}>Approve {quoteTokenSymbol}</button> ) :
                    <button className="btn w-3/4 btn-disabled">Exercise</button>
                }
            </div>
        </div>
    );

};