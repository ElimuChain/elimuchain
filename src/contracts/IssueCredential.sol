// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CredentialIssuance {
    address public admin;
    
    struct Credential {
        string credentialHash;
        string course;
        uint256 year;
        bool issued;
    }

    mapping(address => bool) public institutions;
    mapping(address => Credential) public credentials;

    event InstitutionRegistered(address indexed institution);
    event CredentialIssued(address indexed student, string credentialHash, string course, uint256 year);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyInstitution() {
        require(institutions[msg.sender], "Only registered institutions can issue credentials");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerInstitution(address _institution) external onlyAdmin {
        institutions[_institution] = true;
        emit InstitutionRegistered(_institution);
    }


}
