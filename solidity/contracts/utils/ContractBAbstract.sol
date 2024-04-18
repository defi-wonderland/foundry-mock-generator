pragma solidity ^0.8.0;

import {IContractBAbstract} from '../../interfaces/IContractBAbstract.sol';
import {IContractB2Abstract} from '../../interfaces/IContractB2Abstract.sol';

/**
 * @notice This contract is for testing abstract contracts with multiple inherited unimplemented functions
 */
abstract contract ContractBAbstract is IContractBAbstract, IContractB2Abstract {
  uint256 public uintVariable;

  constructor(uint256 _uintVariable) {
    uintVariable = _uintVariable;
  }

  function setVariablesA(uint256 _newValue) public returns (bool _result) {
    uintVariable = _newValue;
    _result = true;
  }
}
