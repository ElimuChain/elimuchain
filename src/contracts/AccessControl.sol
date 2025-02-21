// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessControlManager is AccessControl {
    bytes32 public constant INSTITUTION_ROLE = keccak256("INSTITUTION");
    bytes32 public constant EMPLOYER_ROLE = keccak256("EMPLOYER");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT");

    event AdminAdded(address indexed admin);
    event RoleGranted(bytes32 indexed role, address indexed account);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

}
