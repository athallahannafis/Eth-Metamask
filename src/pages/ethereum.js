import React, {} from "react";
import { ethers } from "ethers";


export default class EthereumPage extends React.Component {
    constructor() {
        super();
        this.state = {
            metamaskExists: false,
            connectMeta: false,
            account: "",
            balance: 0,
        }
    }
    fetchAccount = async() => {
        var response = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(response[0]);
        this.setState({connectMeta: true, account: response[0]});

        
        var account = response[0];
        /// Returns hex code balance
        var balanceResponse = await window.ethereum.request({
            method:'eth_getBalance', 
            params: [account, 'latest']
        });
        console.log(ethers.utils.formatEther(balanceResponse));
        this.setState({balance: ethers.utils.formatEther(balanceResponse)});
        // .then(balance => {
        //     // Return string value to convert it into int balance
        //     console.log(balance) 
              
        //     // Yarn add ethers for using ethers utils or
        //     // npm install ethers
        //     console.log(ethers.utils.formatEther(balance))
        //     // Format the string into main latest balance
        // })
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
          // console.log(ethFlag);
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
             <div className="flex flex-col items-center">
                <div className="mt-40"/>
                <div className="container w-96 p-2 rounded-md bg-gray-100 flex flex-col items-center">
                    <p>Metamask Account:</p>
                    <p>{this.state.account}</p>
                    <div className="mt-5"/>
                    <p>Balance:</p>
                    <p>{this.state.balance}</p>
                    <div className="mt-5"/>
                    
                </div>
            </div>
        );
    }
}