// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElimuChain {
    struct Credential {
        address issuer;
        address recipient;
        string credentialHash;
        uint256 timestamp;
        bool isValid;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => bool) public verifiedInstitutions;

    event CredentialIssued(
        bytes32 indexed id,
        address indexed issuer,
        address indexed recipient,
        string credentialHash,
        uint256 timestamp
    );

    event InstitutionVerified(address institution);

    modifier onlyVerifiedInstitution() {
        require(verifiedInstitutions[msg.sender], "Not a verified institution");
        _;
    }

    function verifyInstitution(address institution) external {
        verifiedInstitutions[institution] = true;
        emit InstitutionVerified(institution);
    }

    function issueCredential(
        address recipient,
        string memory credentialHash
    ) external onlyVerifiedInstitution {
        bytes32 id = keccak256(
            abi.encodePacked(
                msg.sender,
                recipient,
                credentialHash,
                block.timestamp
            )
        );

        credentials[id] = Credential({
            issuer: msg.sender,
            recipient: recipient,
            credentialHash: credentialHash,
            timestamp: block.timestamp,
            isValid: true
        });

        emit CredentialIssued(
            id,
            msg.sender,
            recipient,
            credentialHash,
            block.timestamp
        );
    }

    function verifyCredential(bytes32 id)
        external
        view
        returns (
            address issuer,
            address recipient,
            string memory credentialHash,
            uint256 timestamp,
            bool isValid
        )
    {
        Credential memory credential = credentials[id];
        return (
            credential.issuer,
            credential.recipient,
            credential.credentialHash,
            credential.timestamp,
            credential.isValid
        );
    }
}