import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { GetMOLMPricing } from './components/GetMOLMPricing'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + RainbowKit + Vite</h1>

      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          <h2>Read Contract</h2>
          <GetMOLMPricing />
        </>
      )}
    </>
  )
}
