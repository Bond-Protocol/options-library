import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount, useNetwork, useProvider} from 'wagmi'
import {GetOLMPricing} from './components/GetOLMPricing'
import {createPublicClient, http} from "viem";
import {GetInitializeBytecode} from "./components/GetInitializeBytecode";
import {useState} from "react";
import {ExerciseWidget} from "./components/ExerciseWidget";

export function App() {
    const {isConnected} = useAccount();
    const {chain} = useNetwork();
    const provider = useProvider();
    const [address, setAddress] = useState<`0x${string}`>("0xb9fa19fc77fab92d90b0a010fbe7b22b045e5dd9");

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
                    <hr />
                    <div className="flex flex-col m-2">
                        <label>OLM Address</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            style={{marginLeft: 4}}
                            value={address}
                        />
                    </div>

                    <hr />
                    <h2 className="px-2">Rewards Estimator</h2>
                    <GetOLMPricing publicClient={publicClient} address={address}/>

                    <hr />
                    <h2 className="px-2">Exercise Widget</h2>
                    <ExerciseWidget publicClient={publicClient} address={address}/>

                    <hr/>
                    <h2>Get Initialize Bytecode</h2>
                    <GetInitializeBytecode />
                </>
            )}
        </>
    )
}
