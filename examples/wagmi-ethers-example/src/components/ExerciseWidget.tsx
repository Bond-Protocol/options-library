import React, { useEffect, useState } from 'react';
import { PublicClient } from 'viem';
import {
  getAbisForChain,
  getOLMTokenList,
  getOTokenData,
} from '../../../../src/helpers';
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Token } from '../../../../src/types';

type ExerciseWidgetProps = {
  publicClient: PublicClient;
  address: `0x${string}`;
};

export const ExerciseWidget = (props: ExerciseWidgetProps) => {
  const chainId = useChainId();
  const abis = getAbisForChain(chainId);
  const account = useAccount();

  /*
  For demonstration purposes, we are setting the tellerAddress manually below.
  This is because the old test contract had a test OLM set up on it. To get the
  current supported deployment, you can use the getAddressesForChain function:

  const tellerAddress = getAddressesForChain(chainId).FixedStrikeOptionTeller;
*/
  const tellerAddress = '0x5C9448c52760Be7E650380e3c635972E8182C6F4';

  const [oTokens, setOTokens] = useState<string[]>([]);

  const [selected, setSelected] = useState<boolean>(false);
  const [optionToken, setOptionToken] = useState<Token>();
  const [payoutToken, setPayoutToken] = useState<Token>();
  const [quoteToken, setQuoteToken] = useState<Token>();

  const [amountToExercise, setAmountToExercise] = useState<string>('0');
  const [decimalAdjustedStrikePrice, setDecimalAdjustedStrikePrice] =
    useState<string>('0');
  const [approvalAmount, setApprovalAmount] = useState<bigint>();

  const exerciseAmount =
    optionToken && !isNaN(Number(amountToExercise))
      ? BigInt(Number(amountToExercise) * Math.pow(10, optionToken?.decimals))
      : BigInt(0);

  const { config: approveConfig } = usePrepareContractWrite({
    address: quoteToken?.address,
    abi: abis.ERC20,
    functionName: 'approve',
    args: [
      tellerAddress,
      // @ts-ignore
      approvalAmount?.toString(),
    ],
  });

  const {
    data: approveData,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    write: approveWrite,
    reset: approveReset,
  } = useContractWrite(approveConfig);

  const waitForApproveTransaction = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const { config: exerciseConfig } = usePrepareContractWrite({
    address: tellerAddress,
    abi: abis.FixedStrikeOptionTeller,
    functionName: 'exercise',
    // @ts-ignore
    args: [optionToken?.address, exerciseAmount?.toString()],
    enabled: waitForApproveTransaction.isSuccess,
  });

  const {
    data: exerciseData,
    isLoading: isExerciseLoading,
    isSuccess: isExerciseSuccess,
    write: exerciseWrite,
    reset: exerciseReset,
    // @ts-ignore
  } = useContractWrite(exerciseConfig);

  const waitForExerciseTransaction = useWaitForTransaction({
    hash: exerciseData?.hash,
  });

  useEffect(() => {
    approveReset();
    exerciseReset();
  }, [
    waitForExerciseTransaction.isSuccess,
    waitForExerciseTransaction.isError,
  ]);

  const getOlmTokenList = () =>
    getOLMTokenList(props.address, props.publicClient).then((res) =>
      setOTokens(res),
    );
  const setOTokenData = (oToken: `0x{string}`) =>
    getOTokenData(oToken, props.publicClient, account.address).then((res) => {
      setOptionToken(res.optionToken);
      setPayoutToken(res.payoutToken);
      setQuoteToken(res.quoteToken);
      setDecimalAdjustedStrikePrice(res.decimalAdjustedStrike);
      setSelected(true);
      setApprovalAmount(res.strikePrice * BigInt(amountToExercise));
      setAmountToExercise(res.decimalAdjustedBalance);
    });

  return (
    <div id="widget" className="grid grid-rows-4 gap-0 border-2 m-2 rounded">
      <div id="option-token" className="flex flex-col m-2">
        <p id="option-token-label" className="font-bold m-0 px-2">
          Option Token to Exercise
        </p>
        <div id="option-token-input" className="flex flex-row p-2 m-0">
          <input
            type="number"
            disabled={!selected}
            value={amountToExercise}
            className="grow input input-primary text-right"
            onChange={(e) => {
              setAmountToExercise(e.target.value);
            }}
          />
          <button
            className="flex-none w-32 ml-1 rounded-full btn-primary btn-md"
            onClick={() => {
              getOlmTokenList();
              // @ts-ignore
              window.my_modal_1.showModal();
            }}
          >
            {optionToken ? optionToken.symbol : 'Select oToken'}
          </button>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">oTokens created by OLM</h3>
              {oTokens.length > 0 && (
                <div className="modal-action flex flex-col">
                  {oTokens.map((oToken, idx) => (
                    <div key={idx} className="flex flex-row m-2">
                      <label className="flex-none w-20">Epoch: {idx}</label>
                      <button
                        className="btn-md btn-neutral"
                        // @ts-ignore
                        onClick={() => setOTokenData(oToken)}
                      >
                        {oToken}
                      </button>
                    </div>
                  ))}
                  <button className="btn">Close</button>
                </div>
              )}
              {oTokens.length === 0 && (
                <div className="modal-action flex flex-col">
                  Loading oTokens...
                  <button className="btn">Close</button>
                </div>
              )}
            </form>
          </dialog>
        </div>
        <p className="m-0 p-0 text-center">+</p>
      </div>

      <div id="quote" className="flex flex-col m-2">
        <div id="quote-header" className="flex flex-row">
          <p className="grow m-0 px-2 font-bold">Pay</p>
          {selected ? (
            <p className="m-0 px-2 justify-self-end">
              Strike Price: {decimalAdjustedStrikePrice.toLocaleString()}{' '}
              {quoteToken?.symbol} per {payoutToken?.symbol}
            </p>
          ) : (
            <p className="m-0 px-2 justify-self-end"></p>
          )}
          <p className="m-0 px-2 w-32"></p>
        </div>
        <div id="quote-input" className="flex flex-row p-2">
          <input
            type="text"
            disabled={true}
            value={
              Number(amountToExercise) * Number(decimalAdjustedStrikePrice)
            }
            className="grow input text-right"
          />
          <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
            {quoteToken?.symbol}
          </button>
        </div>
        <p className="m-0 p-0 text-center">↓</p>
      </div>
      <div id="payout" className="flex flex-col m-2">
        <div id="payout-header" className="flex flex-row">
          <p className="grow m-0 px-2 font-bold">Receive</p>
        </div>
        <div id="payout-input" className="flex flex-row p-2">
          <input
            type="text"
            disabled={true}
            value={amountToExercise}
            className="grow input text-right"
          />
          <button className="flex-none w-32 ml-1 rounded-full btn-neutral btn-disabled btn-md">
            {payoutToken?.symbol}
          </button>
        </div>
      </div>
      {!waitForApproveTransaction.isSuccess && (
        <div id="action" className="text-center">
          {selected &&
            isApproveSuccess &&
            !waitForApproveTransaction.isSuccess && (
              <button className="btn w-3/4 btn-primary" disabled={true}>
                Transaction Pending...
              </button>
            )}
          {selected && isApproveLoading && (
            <button className="btn w-3/4 btn-secondary" disabled={true}>
              Check Wallet
            </button>
          )}
          {selected && !isApproveLoading && !isApproveSuccess && (
            <button
              className="btn w-3/4 btn-secondary"
              onClick={() => {
                approveWrite && approveWrite();
              }}
            >
              Approve {quoteToken?.symbol}
            </button>
          )}
        </div>
      )}
      {waitForApproveTransaction.isSuccess && (
        <div id="action" className="text-center">
          {isExerciseSuccess && !waitForExerciseTransaction.isSuccess && (
            <button className="btn w-3/4 btn-primary" disabled={true}>
              Transaction Pending...
            </button>
          )}
          {isExerciseLoading && (
            <button className="btn w-3/4 btn-secondary" disabled={true}>
              Check Wallet
            </button>
          )}
          {!isExerciseLoading && !isExerciseSuccess && (
            <button
              className="btn w-3/4 btn-primary"
              onClick={() => {
                exerciseWrite && exerciseWrite();
              }}
            >
              Exercise
            </button>
          )}
        </div>
      )}
    </div>
  );
};
