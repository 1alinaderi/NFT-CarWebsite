import '../assets/sass/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer , toast  } from 'react-toastify';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'

export default function App({ Component, pageProps }) {

  const chains = [bsc]
  const projectId = '7e964b77406ba2628b9f8da9ddcb9bd4'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  return (
    <>
    <WagmiConfig config={wagmiConfig}>
    <Component ethereumClient={ethereumClient} {...pageProps} />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    <ToastContainer position="top-center" />

    </>

  )
   
}
