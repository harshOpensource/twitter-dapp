"use client";

import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import ConnectWalletAlert from "@/components/connect-alert";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [networkAlert, setNetworkAlert] = useState(true);
  const [balance, setBalance] = useState("");

  if (!window.ethereum) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Card>
          <CardHeader className="text-center font-semibold">Alert</CardHeader>
          <CardContent>
            <p>
              You need to install{" "}
              <a
                href="https://metamask.io/download"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                Metamask
              </a>
              to use this app
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          return;
        }
        let chainId = await ethereum.request({ method: "eth_chainId" });

        const SepoliabyChainId = "0xaa36a7";

        if (chainId !== SepoliabyChainId) {
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(balanceInEth);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log("Error connecting to metamask", error);
      }
    } else {
      console.log("window is undefined");
    }
  };

  const checkCorrectNetwork = async () => {
    if (typeof window !== "undefined") {
      const { ethereum } = window;
      let chainId = await ethereum.request({ method: "eth_chainId" });

      const SepoliabyChainId = "0xaa36a7";

      if (chainId !== SepoliabyChainId) {
        setCorrectNetwork(false);
        setNetworkAlert(false);
      } else {
        setCorrectNetwork(true);
        setNetworkAlert(true);
      }
    } else {
      console.log("window is undefined");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await connectWallet();
      await checkCorrectNetwork();
    };

    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-white" />
      </div>
    );
  }

  const connectMetamask = async () => {
    if (typeof window !== "undefined") {
      const { ethereum } = window;

      if (typeof ethereum !== "undefined") {
        try {
          const SepoliabyChainId = "0xaa36a7";

          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SepoliabyChainId }],
          });

          location.reload();
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    } else {
      console.log("window is undefined");
    }
  };

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto text-white">
      {!correctNetwork && (
        <ConnectWalletAlert
          connectWallet={connectMetamask}
          isOpen={networkAlert}
          setIsOpen={setNetworkAlert}
        />
      )}
      <Sidebar
        connectMetamask={connectMetamask}
        correctNetwork={correctNetwork}
        account={currentAccount}
        balance={balance}
      />
      <Feed />
      <Widget />
    </main>
  );
}
