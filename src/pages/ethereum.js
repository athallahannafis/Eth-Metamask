import React, {} from "react";


export default class EthereumPage extends React.Component {
    constructor() {
        super();
        this.state = {
            metamaskExists: false,
        }
    }
    handleConnect =() => {
        console.log("CLICKED");
    }
    componentDidMount = () => {
        console.log(!window.ethereum);
        if (!window.ethereum) {
            throw new Error("No metamask");
        }
    }
    render() {
        return(
            <div className="flex flex-col items-center">
                <div className="mt-40"/>
                <div className="container w-96 p-2 rounded-md bg-gray-100 flex flex-col items-center">
                    <p>Connect metamask account</p>
                    <div className="mt-5"/>
                    <div className="bg-cyan-300 pl-5 pr-5 rounded-full" onClick={this.handleConnect} >
                        test
                    </div>

                </div>
            </div>
        );
    }
}