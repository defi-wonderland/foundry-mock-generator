pragma solidity ^0.8.0;

contract Ownable {
  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }
}

abstract contract ContractFAbstract2 is Ownable {
  function setVariablesB(uint256 _newValue) public virtual returns (bool _result);
}

interface IContractFAbstract {
  function QUORUM() external view returns (uint256 _quorum);
  function setVariablesA(uint256 _newValue) external returns (bool _result);
}

abstract contract ContractFAbstract is IContractFAbstract, ContractFAbstract2 {
  uint256 public constant QUORUM = 70;

  function setVariablesA(uint256 _newValue) public virtual returns (bool _result);
}

abstract contract ContractF is IContractFAbstract, ContractFAbstract {}
