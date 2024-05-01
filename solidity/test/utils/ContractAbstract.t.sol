// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractAbstract} from 'test/smock/contracts/utils/MockContractAbstract.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractAbstract is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractAbstract internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 10;
  string internal _someText = 'some text';
  bool internal _result = true;

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractAbstract(
      deployMock('TestContractAbstract', type(MockContractAbstract).creationCode, abi.encode(_initialValue))
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

  function test_Call_UndefinedFunc() public {
    _contractTest.mock_call_undefinedFunc(_someText, _result);
    assertEq(_contractTest.undefinedFunc(_someText), _result);
  }

  function test_Call_UndefinedFuncNoInputNoOutput() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractAbstract.undefinedFuncNoInputNoOutput, ()), 1);

    _contractTest.mock_call_undefinedFuncNoInputNoOutput();
    _contractTest.undefinedFuncNoInputNoOutput();
  }

  function test_Call_UndefinedViewFunc() public {
    _contractTest.mock_call_undefinedViewFunc(_someText, _result);
    assertEq(_contractTest.undefinedViewFunc(_someText), _result);
  }

  function test_Call_UndefinedViewFuncNoInputNoOutput() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractAbstract.undefinedViewFuncNoInputNoOutput, ()), 1);

    _contractTest.mock_call_undefinedViewFuncNoInputNoOutput();
    _contractTest.undefinedViewFuncNoInputNoOutput();
  }

  function test_Call_UndefinedInternalFunc() public {
    _contractTest.expectCall__undefinedInternalFunc(_someText);

    _contractTest.mock_call__undefinedInternalFunc(_someText, _result);
    assertEq(_contractTest.call__undefinedInternalFunc(_someText), _result);
  }

  function test_Call_UndefinedInternalFuncNoInputNoOutput() public {
    _contractTest.expectCall__undefinedInternalFuncNoInputNoOutput();

    _contractTest.mock_call__undefinedInternalFuncNoInputNoOutput();
    _contractTest.call__undefinedInternalFuncNoInputNoOutput();
  }

  function test_Call_UndefinedInternalViewFunc() public {
    _contractTest.expectCall__undefinedInternalViewFunc(_someText);

    _contractTest.mock_call__undefinedInternalViewFunc(_someText, _result);
    assertEq(_contractTest.call__undefinedInternalViewFunc(_someText), _result);
  }

  function test_Call_UndefinedInternalViewFuncNoInputNoOutput() public {
    _contractTest.expectCall__undefinedInternalViewFuncNoInputNoOutput();

    _contractTest.mock_call__undefinedInternalViewFuncNoInputNoOutput();
    _contractTest.call__undefinedInternalViewFuncNoInputNoOutput();
  }
}
