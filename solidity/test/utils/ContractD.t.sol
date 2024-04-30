// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractD} from 'test/smock/contracts/utils/MockContractD.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractD is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractD internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 10;
  string internal _someText = 'some text';

  function setUp() public {
    vm.prank(_owner);

    _contractTest =
      MockContractD(deployMock('TestContractD', type(MockContractD).creationCode, abi.encode(_initialValue)));
  }

  function test_Set_InternalUintVar() public {
    _contractTest.set__internalUintVar(_newValue);
    assertEq(_contractTest.call__internalUintVar(), _newValue);
  }

  function test_Call_InternalUintVar() public {
    _contractTest.expectCall__setInternalUintVar(_initialValue);
    _contractTest.mock_call__setInternalUintVar(_initialValue, true, _newValue, _someText);

    (bool _success, uint256 _value, string memory _text) = _contractTest.call__setInternalUintVar(_initialValue);

    assert(_success);
    assertEq(_value, _newValue);
    assertEq(_text, _someText);
  }

  function test_Call_GetVariables() public {
    _contractTest.expectCall__getVariables(_initialValue);
    _contractTest.mock_call__getVariables(_initialValue, true, _newValue, _someText);

    (bool _success, uint256 _value, string memory _text) = _contractTest.call__getVariables(_initialValue);

    assert(_success);
    assertEq(_value, _newValue);
    assertEq(_text, _someText);
  }

  function test_Call_InternalFuncNoInputNoOutput() public {
    _contractTest.expectCall__internalFuncNoInputNoOutput();
    _contractTest.mock_call__internalFuncNoInputNoOutput();

    _contractTest.call__internalFuncNoInputNoOutput();
  }

  function test_Call_InternalViewFuncNoInputNoOutput() public {
    _contractTest.expectCall__internalViewFuncNoInputNoOutput();
    _contractTest.mock_call__internalViewFuncNoInputNoOutput();

    _contractTest.call__internalViewFuncNoInputNoOutput();
  }
}
