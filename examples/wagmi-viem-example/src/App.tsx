import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount, usePublicClient} from 'wagmi'
import {GetOLMPricing} from './components/GetOLMPricing'
import {goerli} from "wagmi/chains";

export function App() {
    const {isConnected} = useAccount();
    const publicClient = usePublicClient(goerli);

    return (
        <>
            <h1>wagmi + RainbowKit + Vite</h1>

            <ConnectButton/>

            {isConnected && (
                <>
                    <hr/>
                    <h2>Read Contract</h2>
                    <GetOLMPricing publicClient={publicClient}/>
                </>
            )}
        </>
    )
}
