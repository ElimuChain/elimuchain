// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerification {
    
    struct Credential {
        string credentialHash;
        bool isValid;
    }
    
    mapping(address => Credential) private credentials;
    
    event CredentialVerified(address indexed student, bool isValid);
    
    // Function to verify if a credential exists and is valid
    function verifyCredential(address _student, string memory _credentialHash) public view returns (bool) {
        Credential memory cred = credentials[_student];
        return (cred.isValid && keccak256(abi.encodePacked(cred.credentialHash)) == keccak256(abi.encodePacked(_credentialHash)));
    }

}
