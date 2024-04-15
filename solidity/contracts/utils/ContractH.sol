pragma solidity ^0.8.0;

contract ContractH {
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  receive() external payable {}

  fallback() external payable {}
}
