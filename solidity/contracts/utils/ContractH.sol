pragma solidity ^0.8.0;

/**
 * @notice This contract is for testing receive and fallback functions
 */
contract ContractH {
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  receive() external payable {}

  fallback() external payable {}
}
