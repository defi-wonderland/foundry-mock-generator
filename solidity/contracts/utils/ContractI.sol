pragma solidity ^0.8.0;

contract Ownable {
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }
}

contract Pausable {
  bool public paused;

  constructor(bool _paused) {
    paused = _paused;
  }
}

abstract contract ContractI is Ownable, Pausable {}

abstract contract ContractI2 is Ownable, Pausable {
  bool public boolean;

  constructor(bool _boolean) {
    boolean = _boolean;
  }
}
