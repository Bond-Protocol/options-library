import {connectorsForWallets} from '@rainbow-me/rainbowkit'
import {configureChains, createClient} from 'wagmi'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {injectedWallet, metaMaskWallet} from "@rainbow-me/rainbowkit/wallets";

const { chains, provider } = configureChains(
    [goerli],
    [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({
        chains,
        walletConnectVersion: '1'
      }),
      injectedWallet({ chains, shimDisconnect: true }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains, client }
