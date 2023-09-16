import { ThirdwebProvider } from "@thirdweb-dev/react";
import './App.css';
import Home from "./components/Home";
import TransactionsList from "./components/TransactionsList";

function App() {
  return (
    <ThirdwebProvider activeChain="goerli">
      <Home />
    </ThirdwebProvider>
  );
}

export default App;
