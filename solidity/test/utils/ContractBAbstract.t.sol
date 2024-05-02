// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractBAbstract} from 'test/smock/contracts/utils/MockContractBAbstract.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractBAbstract is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractBAbstract internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 10;
  bool internal _result = true;

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractBAbstract(
      deployMock('TestContractBAbstract', type(MockContractBAbstract).creationCode, abi.encode(_initialValue))
    );
  }

  function test_Set_UintVariable() public {
    _contractTest.set_uintVariable(_newValue);
    assertEq(_contractTest.uintVariable(), _newValue);
  }

  function test_Call_UintVariable() public {
    _contractTest.mock_call_uintVariable(_newValue);
    assertEq(_contractTest.uintVariable(), _newValue);
  }

  function test_Call_SetVariablesA() public {
    _contractTest.mock_call_setVariablesA(_newValue, _result);
    assertEq(_contractTest.setVariablesA(_newValue), _result);
  }

  function test_Call_UndefinedInterfaceFunc() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractBAbstract.undefinedInterfaceFunc, (_newValue)), 1);

    _contractTest.mock_call_undefinedInterfaceFunc(_newValue, _result);
    assertEq(_contractTest.undefinedInterfaceFunc(_newValue), _result);
  }

  function test_Call_UndefinedInterfaceFunc2() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractBAbstract.undefinedInterfaceFunc2, (_newValue)), 1);

    _contractTest.mock_call_undefinedInterfaceFunc2(_newValue, _result);
    assertEq(_contractTest.undefinedInterfaceFunc2(_newValue), _result);
  }
}
