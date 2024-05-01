// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractE} from 'test/smock/contracts/utils/MockContractE.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';

contract UnitMockContractE is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractE internal _contractTest;

  uint256 internal _initialValue = 5;
  uint256 internal _initialValue2 = 10;
  uint256 internal _newValue = 15;

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractE(
      deployMock('TestContractE', type(MockContractE).creationCode, abi.encode(_initialValue, _initialValue2))
    );
  }

  function test_Set_InternalUintVar2() public {
    _contractTest.set__internalUintVar2(_newValue);
    assertEq(_contractTest.call__internalUintVar2(), _newValue);
  }
}
