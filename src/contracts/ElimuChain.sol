// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControlManager.sol";
import "./CredentialIssuance.sol";
import "./DataPrivacy.sol";
import "./CredentialVerification.sol";
import "./ReputationSystem.sol";

contract ElimuChain {
    AccessControlManager public accessControlManager;
    CredentialIssuance public credentialIssuance;
    DataPrivacy public dataPrivacy;
    CredentialVerification public credentialVerification;
    ReputationSystem public reputationSystem;

    event ContractsDeployed(
        address accessControlManager,
        address credentialIssuance,
        address dataPrivacy,
        address credentialVerification,
        address reputationSystem
    );

    constructor() {
        // Deploy each contract and store their addresses
        accessControlManager = new AccessControlManager();
        credentialIssuance = new CredentialIssuance();
        dataPrivacy = new DataPrivacy();
        credentialVerification = new CredentialVerification();
        reputationSystem = new ReputationSystem();

        emit ContractsDeployed(
            address(accessControlManager),
            address(credentialIssuance),
            address(dataPrivacy),
            address(credentialVerification),
            address(reputationSystem)
        );
    }

    // Function to get contract addresses
    function getContractAddresses() public view returns (
        address, address, address, address, address
    ) {
        return (
            address(accessControlManager),
            address(credentialIssuance),
            address(dataPrivacy),
            address(credentialVerification),
            address(reputationSystem)
        );
    }
}
