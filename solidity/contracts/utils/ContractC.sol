pragma solidity ^0.8.0;

import {IContractCA} from '../../interfaces/IContractCA.sol';

/**
 * @notice This contract is for testing uint256 variables and function with return values
 */
contract ContractCA is IContractCA {
  uint256 public uint256Variable;

  function setVariablesC(uint256 _uint256Variable) public returns (bool _result) {
    uint256Variable = _uint256Variable;
    _result = true;
  }
}
