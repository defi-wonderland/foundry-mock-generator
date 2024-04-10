pragma solidity ^0.8.0;

import {ContractD} from './ContractD.sol';

contract ContractE is ContractD {
  uint256 internal _internalUintVar2;

  constructor(uint256 _uintVariable, uint256 _uintVariable2) ContractD(_uintVariable) {
    _internalUintVar2 = _uintVariable2;
  }
}
