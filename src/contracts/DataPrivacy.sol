// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataPrivacy {
    mapping(address => mapping(address => bool)) private accessPermissions;

    event AccessGranted(address indexed student, address indexed verifier);
    event AccessRevoked(address indexed student, address indexed verifier);

    // Function to grant access to a verifier (employer, institution, etc.)
    function grantAccess(address _verifier) public {
        require(_verifier != address(0), "Invalid verifier address");
        accessPermissions[msg.sender][_verifier] = true;
        emit AccessGranted(msg.sender, _verifier);
    }

    // Function to revoke access from a verifier
    function revokeAccess(address _verifier) public {
        require(accessPermissions[msg.sender][_verifier], "No access to revoke");
        accessPermissions[msg.sender][_verifier] = false;
        emit AccessRevoked(msg.sender, _verifier);
    }

}
