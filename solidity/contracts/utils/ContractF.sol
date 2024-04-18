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
 * @notice Simple abstract contract inheriting from a contract
 */
abstract contract ContractFAbstract2 is Ownable {
  function setVariablesB(uint256 _newValue) public virtual returns (bool _result);
}

/**
 * @notice Interface for ContractFAbstract
 */
interface IContractFAbstract {
  function QUORUM() external view returns (uint256 _quorum);
  function setVariablesA(uint256 _newValue) external returns (bool _result);
}

/**
 * @notice Contract for testing abstract contracts with a variable and a unimplemented function
 * while inheriting from another abstract contract and its interface
 */
abstract contract ContractFAbstract is IContractFAbstract, ContractFAbstract2 {
  uint256 public constant QUORUM = 70;

  function setVariablesA(uint256 _newValue) public virtual returns (bool _result);
}

/**
 * @notice Contract for testing abstract contracts with multiple inheritance of same functions
 * Also testing multiple levels of abstract inheritance
 */
abstract contract ContractF is IContractFAbstract, ContractFAbstract {}
