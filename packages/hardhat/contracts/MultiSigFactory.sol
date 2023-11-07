// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './MultiSigWallet.sol';

contract MultiSigFactory {

    event NewMultiSigContract(address indexed creator, uint256 signaturesRequired );

    MultiSigContract[] public multiSigContracts;
    address public newContract;

    struct MultiSigContract {
        address contractAddress;
        uint requiredConfirmations;
        bool shown;
        address[] signers;
    }

    function getMultiSigContracts() public view returns (MultiSigContract[] memory) {
        return multiSigContracts;
    }

    function createContract(uint _requiredConfirmations, address[] memory _signers ) public {
        require(_requiredConfirmations > 0, "signatures must be greater than 0");

        MultiSigContract memory newContractInstance;
        newContractInstance.contractAddress = address(new MultiSigWallet(_signers, _requiredConfirmations, address(this)));
        newContractInstance.requiredConfirmations = _requiredConfirmations;
        newContractInstance.shown = true;
        newContractInstance.signers = _signers;

        multiSigContracts.push(newContractInstance);
    
        emit NewMultiSigContract(msg.sender, _requiredConfirmations);   
    }
}