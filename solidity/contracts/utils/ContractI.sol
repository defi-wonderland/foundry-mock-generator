pragma solidity ^0.8.0;

/**
 * @notice Simple Ownable contract
 */
contract Ownable {
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }
}

/**
 * @notice Simple Pausable contract
 */
contract Pausable {
  bool public paused;

  constructor(bool _paused) {
    paused = _paused;
  }
}

/**
 * @notice Testing abstract contract with multiple inherited contracts
 */
abstract contract ContractI is Ownable, Pausable {}

/**
 * @notice Testing abstract contract with constructor and with multiple inherited contracts
 */
abstract contract ContractI2 is Ownable, Pausable {
  bool public boolean;

  constructor(bool _boolean) {
    boolean = _boolean;
  }
}
