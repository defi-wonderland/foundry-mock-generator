// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractB} from 'test/smock/contracts/utils/MockContractB.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractB is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractB internal _contractTest;

  string internal _newValue = 'new value';

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractB(deployMock('TestContractB', type(MockContractB).creationCode, abi.encode()));
  }

  function test_Set_StringVariable() public {
    _contractTest.set_stringVariable(_newValue);
    assertEq(_contractTest.stringVariable(), _newValue);
  }

  function test_Call_StringVariable() public {
    _contractTest.mock_call_stringVariable(_newValue);
    assertEq(_contractTest.stringVariable(), _newValue);
  }

  function test_Call_SetVariablesB() public {
    bool _result = true;

    _contractTest.mock_call_setVariablesB(_newValue, _result);
    assertEq(_contractTest.setVariablesB(_newValue), _result);
  }
}
