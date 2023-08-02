import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { GetOLMPricing } from './components/GetOLMPricing'
import { ExerciseWidget } from './components/ExerciseWidget'

export function App() {
  const { isConnected } = useAccount()

  const oTokens = [
    
  ];

  return (
    <div className="prose">
      <h1 className="p-2">oToken Front-end Example</h1>

      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          <h2 className="px-2">Read Contract</h2>
          <GetOLMPricing />
          <hr />
          <h2 className="px-2">Exercise Widget</h2>
          <ExerciseWidget />
        </>
      )}
    </div>
  )
}
