// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractCA} from 'test/smock/contracts/utils/MockContractCA.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractCA is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractCA internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 10;

  function setUp() public {
    vm.prank(_owner);

    _contractTest =
      MockContractCA(deployMock('TestContractCA', type(MockContractCA).creationCode, abi.encode(_initialValue)));
  }

  function test_Set_Uint256Variable() public {
    _contractTest.set_uint256Variable(_newValue);
    assertEq(_contractTest.uint256Variable(), _newValue);
  }

  function test_Call_Uint256Variable() public {
    _contractTest.mock_call_uint256Variable(_newValue);
    assertEq(_contractTest.uint256Variable(), _newValue);
  }

  function test_Call_SetVariablesC() public {
    bool _result = true;

    _contractTest.mock_call_setVariablesC(_newValue, _result);
    assertEq(_contractTest.setVariablesC(_newValue), _result);
  }
}
