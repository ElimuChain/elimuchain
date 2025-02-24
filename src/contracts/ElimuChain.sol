// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElimuChain {
    struct Credential {
        string credentialHash;
        address issuer;
        uint256 issueDate;
        bool isValid;
        string metadataURI;
    }

    struct Institution {
        string name;
        string accreditationProof;
        uint8 requiredVerifiers;
        address[] verifiers;
        bool isVerified;
        mapping(address => bool) hasVerified;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => Institution) public institutions;
    mapping(address => bool) public authorizedIssuers;

    address public owner;

    event CredentialIssued(
        bytes32 indexed id,
        address indexed issuer,
        string credentialHash
    );
    event CredentialsBatchIssued(address indexed issuer, uint256 count);
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);
    event CredentialRevoked(bytes32 indexed id);
    event InstitutionRegistered(address indexed institution, string name);
    event InstitutionVerified(
        address indexed institution,
        address indexed verifier
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorizedIssuer() {
        require(
            authorizedIssuers[msg.sender],
            "Only authorized issuers can call this function"
        );
        _;
    }

    modifier onlyVerifiedInstitution() {
        require(
            institutions[msg.sender].isVerified,
            "Only verified institutions can call this function"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    function registerInstitution(
        string memory name,
        string memory accreditationProof,
        uint8 requiredVerifiers
    ) public {
        require(requiredVerifiers > 0, "Must require at least one verifier");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(
            bytes(accreditationProof).length > 0,
            "Accreditation proof required"
        );

        Institution storage institution = institutions[msg.sender];
        require(
            bytes(institution.name).length == 0,
            "Institution already registered"
        );

        institution.name = name;
        institution.accreditationProof = accreditationProof;
        institution.requiredVerifiers = requiredVerifiers;
        institution.isVerified = false;

        emit InstitutionRegistered(msg.sender, name);
    }

    function verifyInstitution(address institutionAddress) public {
        Institution storage institution = institutions[institutionAddress];
        require(
            bytes(institution.name).length > 0,
            "Institution not registered"
        );
        require(
            !institution.hasVerified[msg.sender],
            "Already verified this institution"
        );
        require(
            msg.sender != institutionAddress,
            "Cannot verify own institution"
        );

        institution.verifiers.push(msg.sender);
        institution.hasVerified[msg.sender] = true;

        if (institution.verifiers.length >= institution.requiredVerifiers) {
            institution.isVerified = true;
            authorizedIssuers[institutionAddress] = true;
        }

        emit InstitutionVerified(institutionAddress, msg.sender);
    }

    function issueBatchCredentials(
        bytes32[] memory ids,
        string[] memory credentialHashes,
        string[] memory metadataURIs
    ) public onlyAuthorizedIssuer {
        require(
            ids.length == credentialHashes.length &&
                ids.length == metadataURIs.length,
            "Array lengths must match"
        );

        for (uint i = 0; i < ids.length; i++) {
            require(
                credentials[ids[i]].issueDate == 0,
                "Credential ID already exists"
            );

            credentials[ids[i]] = Credential({
                credentialHash: credentialHashes[i],
                issuer: msg.sender,
                issueDate: block.timestamp,
                isValid: true,
                metadataURI: metadataURIs[i]
            });

            emit CredentialIssued(ids[i], msg.sender, credentialHashes[i]);
        }

        emit CredentialsBatchIssued(msg.sender, ids.length);
    }

    function issueCredential(
        bytes32 id,
        string memory credentialHash,
        string memory metadataURI
    ) public onlyAuthorizedIssuer {
        require(credentials[id].issueDate == 0, "Credential ID already exists");

        credentials[id] = Credential({
            credentialHash: credentialHash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            isValid: true,
            metadataURI: metadataURI
        });

        emit CredentialIssued(id, msg.sender, credentialHash);
    }

    function revokeCredential(bytes32 id) public {
        require(
            msg.sender == owner || msg.sender == credentials[id].issuer,
            "Only owner or issuer can revoke credentials"
        );
        require(
            credentials[id].isValid,
            "Credential is already revoked or doesn't exist"
        );

        credentials[id].isValid = false;
        emit CredentialRevoked(id);
    }

    function verifyCredential(
        bytes32 id,
        string memory credentialHash
    ) public view returns (bool, address, uint256, string memory) {
        Credential memory cred = credentials[id];
        require(cred.issueDate != 0, "Credential does not exist");

        bool isValid = cred.isValid &&
            keccak256(abi.encodePacked(cred.credentialHash)) ==
            keccak256(abi.encodePacked(credentialHash));

        return (isValid, cred.issuer, cred.issueDate, cred.metadataURI);
    }

    function getInstitution(
        address institutionAddress
    )
        public
        view
        returns (
            string memory name,
            string memory accreditationProof,
            uint8 requiredVerifiers,
            address[] memory verifiers,
            bool isVerified
        )
    {
        Institution storage institution = institutions[institutionAddress];
        require(bytes(institution.name).length > 0, "Institution not found");

        return (
            institution.name,
            institution.accreditationProof,
            institution.requiredVerifiers,
            institution.verifiers,
            institution.isVerified
        );
    }
}
