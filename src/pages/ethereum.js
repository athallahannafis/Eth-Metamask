import React, {} from "react";
import { ethers } from "ethers";


export default class EthereumPage extends React.Component {
    constructor() {
        super();
        this.state = {
            metamaskExists: false,
            connectMeta: false,
            account: "",
            balance: "Loading...",
            transferAddress: "",
            transferAmount: 0,
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
        var response = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(response);
        this.setState({connectMeta: true, account: response[0]});

        
        var account = response[0];
        /// Returns hex code balance
        var balanceResponse = await window.ethereum.request({
            method:'eth_getBalance', 
            params: [account, 'latest']
        });
        console.log(ethers.utils.formatEther(balanceResponse));
        this.setState({balance: ethers.utils.formatEther(balanceResponse)});
       
    }
    sendEth = async() => {
        try {

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
            console.log(e);
        }
        
    }
    refresh = () => {
        this.fetchAccount();
    }
    handleConnect = async() => {
        console.log("CLICKED");
         /**
         * !window.ethereum == false -> metamask exists
         * otherwise -> metamask doesn't exist
         */
          console.log(!window.ethereum);
          var ethFlag = !window.ethereum;
          var account;
          if (ethFlag == false) {
            this.fetchAccount();
          }
    }



    componentDidMount = () => {
       
    }
    render() {
        return(
            this.state.connectMeta == false ?
            <div className="flex flex-col items-center">
                <div className="mt-40"/>
                <div className="container w-96 p-2 rounded-md bg-gray-100 flex flex-col items-center">
                    <p>Connect metamask account</p>
                    <div className="mt-5"/>
                    <button className="bg-cyan-300 pl-5 pr-5 rounded-full" onClick={this.handleConnect} >
                        Connect
                    </button>
                </div>
            </div> : 
             <div className="flex flex-col items-center md:max-w-2xl">
                <div className="mt-40"/>
                <div className="container w-96 p-2 rounded-md bg-gray-100 flex flex-col items-center">
                    <p>Metamask Account:</p>
                    <p>{this.state.account}</p>
                    <div className="mt-5"/>
                    <p>Balance:</p>
                    <p>{this.state.balance}</p>
                    <div className="mt-5"/>
                    
                    <div className="mt-10"/>
                    <p>Send ETH Payment</p>
                    <div>
                        <p>Account address:</p>
                        <input type="text" placeholder="Address" value={this.state.transferAddress} onChange={this.transferAddressHandler} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        "/>
                        <div className="mt-5"/>

                        <p>Transfer Amount:</p>
                        <input type="text" placeholder="0" value={this.state.transferAmount} onChange={this.transferAmountHandler} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        "/>
                        <div className="mt-5"/>
                        
                        <button className="bg-cyan-300 pl-5 pr-5 rounded-full" onClick={this.sendEth} >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}