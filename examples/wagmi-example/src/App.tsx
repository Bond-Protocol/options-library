import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { GetOLMPricing } from './components/GetOLMPricing'
import { ExerciseWidget } from './components/ExerciseWidget'
import {usePublicClient} from 'wagmi'
import {goerli} from "wagmi/chains";
import {useState} from 'react'

export function App() {
  const { isConnected } = useAccount()

  const publicClient = usePublicClient(goerli);
  const [address, setAddress] = useState<`0x${string}`>("0xb9fa19fc77fab92d90b0a010fbe7b22b045e5dd9");

  return (
    <div className="prose">
      <h1 className="p-2">oToken Front-end Example</h1>

      <ConnectButton />

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
        </>
      )}
    </div>
  )
}
