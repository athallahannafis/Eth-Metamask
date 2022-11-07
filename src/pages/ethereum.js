import React, {} from "react";
import { ethers } from "ethers";
import { ReactSession } from 'react-client-session';


export default class EthereumPage extends React.Component {
    constructor() {
        super();
        this.state = {
            metamaskExists: false,
            connectMeta: false,
            account: "",
            balancee: "Loading...",
            transferAddress: "",
            transferAmount: null,
        }

        /// Input binders
        this.transferAddressHandler = this.transferAddressHandler.bind(this);
        this.transferAmountHandler = this.transferAmountHandler.bind(this);
    }
    /** Input handlers */    
    transferAddressHandler = (e) => {
        this.setState({transferAddress: e.target.value});
    }
    transferAmountHandler = (e) => {
        this.setState({transferAmount: e.target.value});
    }
    /** End of input handlers */    
    fetchAccount = async() => {
        /// Get account
        var response = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(response);
        this.setState({});
        var account = response[0];
        localStorage.setItem("userAddress", account);
        
        /// Returns hex code balance
        var balanceResponse = await window.ethereum.request({
            method:'eth_getBalance', 
            params: [account, 'latest']
        });
        console.log(ethers.utils.formatEther(balanceResponse));
        var ethBalance = ethers.utils.formatEther(balanceResponse);
        this.setState({});
        
        localStorage.setItem("balance", ethBalance);
    }
    sendEth = async() => {
        /**
         * Send eth currency from CURRENTLY ACTIVE ACCOUNT in metamask extension
         */
        try {
            this.refresh();
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("Provider: " + provider);
            
            var signer = provider.getSigner();
            console.log("Signer: " + signer);
    
            console.log(ethers.utils.getAddress(this.state.transferAddress));
    
            var amount = ethers.utils.parseEther(this.state.transferAmount);
            // console.log(amount._hex);
            // console.log(ethers.utils.formatEther(amount._hex));
            var response = await signer.sendTransaction({
                to: this.state.transferAddress,
                value: ethers.utils.parseEther(this.state.transferAmount),
            });
            console.log(response);
            this.refresh();
            
        } catch(e) {
            alert(e);
        }
        
    }
    refreshBalance = async() => {
        var balanceResponse = await window.ethereum.request({
            method:'eth_getBalance', 
            params: [localStorage.getItem("userAddress"), 'latest']
        });
        this.setState({});

        localStorage.setItem("balance", ethers.utils.formatEther(balanceResponse));
    }
    refreshAccount = async() => {
        /// Get account
        var response = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(response);
        this.setState({});
        var account = response[0];
        localStorage.setItem("userAddress", account);
    }
    refresh = () => {
        this.fetchAccount();
    }
    handleConnect = async() => {
         /**
         * !window.ethereum == false -> metamask exists
         * otherwise -> metamask doesn't exist
         */
          console.log(!window.ethereum);
          var ethFlag = !window.ethereum;
          if (ethFlag === false) {
            this.fetchAccount();
          } else{
            alert("Install Metamask extension first");
          }
    }

    clearLocalStorage = () => {
        localStorage.clear("userAddress");
        localStorage.clear("balance");
        window.location.reload();
        
    }



    componentDidMount = () => {
        // this.clearLocalStorage();
    }
    render() {
        return(
            localStorage.getItem("userAddress") == null ?
            <div className="flex flex-col items-center">
                <div className="mt-40"/>
                <div className="w-96 p-2 rounded-md bg-gray-100 flex flex-col items-center">
                    <p>Connect metamask account</p>
                    <div className="mt-5"/>
                    <button className="bg-sky-700 hover:bg-cyan-700 px-5 py-2 rounded-full" onClick={this.handleConnect} >
                        <p className="text-white font-bold">
                            Connect
                        </p>
                    </button>
                </div>
            </div> : 
             <div className="flex flex-col items-center ">
                <div className="mt-40"/>
                <div className="w-1/2 p-10 rounded-md bg-gray-100 flex flex-col items-center">
                    <div>
                        <p className="font-bold">Metamask Account</p>
                        <p className="font-bold">(Currently active and connected from extension):</p>
                        <p>{localStorage.getItem("userAddress")}</p>
                        <div className="mt-5"/>
                        <p className="font-bold">Balance:</p>
                        <p>{localStorage.getItem("balance")}</p>
                        <div className="mt-5"/>

                        <div className="flex flex-row justify-center">
                            <button className="bg-sky-700 hover:bg-red-700 px-5 py-2 rounded-full" onClick={this.clearLocalStorage} >
                                <p className="text-white font-bold">Disconnect account</p>
                            </button>
                            <div className="w-10"/>
                            <button className="bg-sky-700 hover:bg-cyan-700 px-5 py-2 rounded-full" onClick={this.fetchAccount} >
                                <p className="text-white font-bold">Refresh</p>
                            </button>
                        </div>
                    </div>

                    <div className="mt-10"/>
                    <div class="border-t-4 border-grey-700 w-full flex flex-col items-center">
                        <div className="mt-5"/>
                        <p className="font-bold">Send ETH Payment</p>
                    </div>
                    <div className="mt-5"/>

                    <div className="flex flex-col items-center">
                        <div>
                            <p>Account address:</p>
                            <input type="text" placeholder="0x526ef..." value={this.state.transferAddress} onChange={this.transferAddressHandler} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            "/>
                            <div className="mt-5"/>

                            <p>Transfer Amount:</p>
                            <input type="text" placeholder="0.0001" value={this.state.transferAmount} onChange={this.transferAmountHandler} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            "/>
                            <div className="mt-5"/>
                        </div>

                        <button className="bg-sky-700 px-5 py-2 hover:bg-green-700 rounded-full" onClick={this.sendEth} >
                            <p className="text-white font-bold">Send</p>
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}