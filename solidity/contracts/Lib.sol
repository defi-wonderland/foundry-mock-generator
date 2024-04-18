// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @notice This contract library is for testing that libraries mocks are not generated
 */
library Lib {
  function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
  }
}
