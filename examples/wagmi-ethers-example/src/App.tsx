import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount, useNetwork, useProvider} from 'wagmi'
import {GetOLMPricing} from './components/GetOLMPricing'
import {createPublicClient, http} from "viem";

export function App() {
    const {isConnected} = useAccount();
    const {chain} = useNetwork();
    const provider = useProvider();

    const publicClient = createPublicClient({
            transport: http(provider.connection.url),
            chain
        }
    );

    return (
        <>
            <h1>wagmi + RainbowKit + Vite</h1>

            <ConnectButton/>

            {isConnected && (
                <>
                    <hr/>
                    <h2>Read Contract</h2>
                    <GetOLMPricing publicClient={publicClient} />
                </>
            )}
        </>
    )
}
