import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useChainId,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';
import { GetOLMPricing } from './components/GetOLMPricing';
import {
  createPublicClient,
  createWalletClient,
  http,
  WalletClient,
} from 'viem';
import { GetInitializeBytecode } from './components/GetInitializeBytecode';
import { useEffect, useState } from 'react';
import { ExerciseWidget } from './components/ExerciseWidget';

export function App() {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const provider = useProvider();
  const [olmAddress, setOlmAddress] = useState<`0x${string}`>(
    '0xb9fa19fc77fab92d90b0a010fbe7b22b045e5dd9',
  );
  const [walletClient, setWalletClient] = useState<WalletClient>();

  /*
        Manually create a Viem PublicClient for use with options-library.
        Other values for transport and chain are acceptable, for example a private
        RPC endpoint.
     */
  const publicClient = createPublicClient({
    // @ts-ignore
    transport: http(provider.connection.url),
    chain,
  });

  useEffect(() => {
    if (signer && address) {
      /*
                Manually create a Viem WalletClient for use with options-library.
            */
      setWalletClient(
        createWalletClient({
          // @ts-ignore
          transport: http(signer?.provider.connection.url),
          chain,
          account: address,
        }),
      );
    }
  }, [signer, address]);

  return (
    <div className="prose m-2">
      <h1>oToken Examples</h1>

      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          <div className="flex flex-col m-2">
            <label>OLM Address</label>
            <input
              // @ts-ignore
              onChange={(e) => setOlmAddress(e.target.value)}
              style={{ marginLeft: 4 }}
              value={olmAddress}
            />
          </div>

          <hr />
          <h2 className="px-2">Rewards Estimator</h2>
          <GetOLMPricing publicClient={publicClient} address={olmAddress} />

          <hr />
          <h2 className="px-2">Exercise Widget</h2>
          <ExerciseWidget
            publicClient={publicClient}
            // @ts-ignore
            walletClient={walletClient}
            address={olmAddress}
          />

          <hr />
          <h2>Get Initialize Bytecode</h2>
          <GetInitializeBytecode chainId={chainId} />
        </>
      )}
    </div>
  );
}
