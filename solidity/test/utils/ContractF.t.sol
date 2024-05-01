// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractF} from 'test/smock/contracts/utils/MockContractF.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractF is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractF internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _newValue = 15;

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractF(deployMock('TestContractF', type(MockContractF).creationCode, abi.encode(_owner)));
  }

  function test_Call_SetVariablesA() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractF.setVariablesA, _newValue));
    _contractTest.mock_call_setVariablesA(_newValue, true);

    assert(_contractTest.setVariablesA(_newValue));
  }

  function test_Call_SetVariablesB() public {
    vm.expectCall(address(_contractTest), abi.encodeCall(MockContractF.setVariablesB, _newValue));
    _contractTest.mock_call_setVariablesB(_newValue, true);

    assert(_contractTest.setVariablesB(_newValue));
  }
}
