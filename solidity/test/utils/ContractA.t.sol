// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractA} from 'test/smock/contracts/utils/MockContractA.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractA is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractA internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 10;

  function setUp() public {
    vm.prank(_owner);

    _contractTest =
      MockContractA(deployMock('TestContractA', type(MockContractA).creationCode, abi.encode(_initialValue)));
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
    bool _result = true;

    _contractTest.mock_call_setVariablesA(_newValue, _result);
    assertEq(_contractTest.setVariablesA(_newValue), _result);
  }
}
