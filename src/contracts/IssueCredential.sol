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

    function issueCredential(address _student, string memory _credentialHash, string memory _course, uint256 _year) external onlyInstitution {
        require(!credentials[_student].issued, "Credential already issued");
        credentials[_student] = Credential(_credentialHash, _course, _year, true);
        emit CredentialIssued(_student, _credentialHash, _course, _year);
    }

    function getCredential(address _student) external view returns (string memory, string memory, uint256, bool) {
        Credential memory cred = credentials[_student];
        return (cred.credentialHash, cred.course, cred.year, cred.issued);
    }
    

}
