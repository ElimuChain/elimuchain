// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    struct Institution {
        uint256 totalRating;
        uint256 ratingCount;
    }

    mapping(address => Institution) private institutions;
    mapping(address => mapping(address => bool)) private hasRated;

    event InstitutionRated(address indexed institution, address indexed rater, uint8 rating);
    
    // Function to rate an institution (1-5 scale)
    function rateInstitution(address _institution, uint8 _rating) public {
        require(_rating >= 1 && _rating <= 5,
        "Rating must be between 1 and 5");
        require(!hasRated[msg.sender
        ][_institution
        ],
        "You have already rated this institution");

        institutions[_institution
        ].totalRating += _rating;
        institutions[_institution
        ].ratingCount += 1;
        hasRated[msg.sender
        ][_institution
        ] = true;

        emit InstitutionRated(_institution, msg.sender, _rating);
    }
    // Function to retrieve an institution's credibility score
    function getReputationScore(address _institution) public view returns (uint256) {
        Institution memory inst = institutions[_institution
        ];
        if (inst.ratingCount == 0) {
            return 0; // No ratings yet
        }
        return inst.totalRating / inst.ratingCount;
    }
}