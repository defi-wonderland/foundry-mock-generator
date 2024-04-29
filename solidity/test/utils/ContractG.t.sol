// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from 'forge-std/Test.sol';
import {MockContractG} from 'test/smock/contracts/utils/MockContractG.sol';
import {SmockHelper} from 'test/smock/SmockHelper.sol';
import {ContractG} from 'contracts/utils/ContractG.sol';

contract UnitMockContractG is Test, SmockHelper {
  address internal _owner = makeAddr('owner');
  MockContractG internal _contractTest;

  function setUp() public {
    vm.prank(_owner);

    _contractTest = MockContractG(deployMock('TestContractG', type(MockContractG).creationCode, abi.encode()));
  }

  function test_Set_MyStructArray() public {
    ContractG.CommonStruct[] memory _myStructArray = new ContractG.CommonStruct[](2);
    _myStructArray[0] = ContractG.CommonStruct(10);
    _myStructArray[1] = ContractG.CommonStruct(20);

    _contractTest.set_structArray(_myStructArray);
    (uint256 _value) = _contractTest.structArray(0);
    assertEq(_value, 10);

    (_value) = _contractTest.structArray(1);
    assertEq(_value, 20);
  }

  function test_Set_TwoDimensionalArray() public {
    uint256[][] memory _twoDimensionalStruct = new uint256[][](2);
    _twoDimensionalStruct[0] = new uint256[](2);
    _twoDimensionalStruct[1] = new uint256[](2);

    _twoDimensionalStruct[0][0] = 10;
    _twoDimensionalStruct[0][1] = 20;
    _twoDimensionalStruct[1][0] = 30;
    _twoDimensionalStruct[1][1] = 40;

    _contractTest.set_twoDimensionalArray(_twoDimensionalStruct);
    (uint256 _value) = _contractTest.twoDimensionalArray(0, 0);
    assertEq(_value, 10);

    (_value) = _contractTest.twoDimensionalArray(0, 1);
    assertEq(_value, 20);

    (_value) = _contractTest.twoDimensionalArray(1, 0);
    assertEq(_value, 30);

    (_value) = _contractTest.twoDimensionalArray(1, 1);
    assertEq(_value, 40);
  }

  function test_Call_TwoDimensionalArray() public {
    uint256[][] memory _twoDimensionalStruct = new uint256[][](2);
    _twoDimensionalStruct[0] = new uint256[](2);
    _twoDimensionalStruct[1] = new uint256[](2);

    _twoDimensionalStruct[0][0] = 10;
    _twoDimensionalStruct[0][1] = 20;
    _twoDimensionalStruct[1][0] = 30;
    _twoDimensionalStruct[1][1] = 40;

    _contractTest.mock_call_twoDimensionalArray(0, 0, _twoDimensionalStruct[0][0]);
    (uint256 _value) = _contractTest.twoDimensionalArray(0, 0);
    assertEq(_value, 10);

    _contractTest.mock_call_twoDimensionalArray(0, 1, _twoDimensionalStruct[0][1]);
    (_value) = _contractTest.twoDimensionalArray(0, 1);
    assertEq(_value, 20);

    _contractTest.mock_call_twoDimensionalArray(1, 0, _twoDimensionalStruct[1][0]);
    (_value) = _contractTest.twoDimensionalArray(1, 0);
    assertEq(_value, 30);

    _contractTest.mock_call_twoDimensionalArray(1, 1, _twoDimensionalStruct[1][1]);
    (_value) = _contractTest.twoDimensionalArray(1, 1);
    assertEq(_value, 40);
  }

  function test_Set_ThreeDimensionalArray() public {
    uint256[][][] memory _threeDimensionalStruct = new uint256[][][](2);
    _threeDimensionalStruct[0] = new uint256[][](2);
    _threeDimensionalStruct[1] = new uint256[][](2);

    _threeDimensionalStruct[0][0] = new uint256[](2);
    _threeDimensionalStruct[0][1] = new uint256[](2);
    _threeDimensionalStruct[1][0] = new uint256[](2);
    _threeDimensionalStruct[1][1] = new uint256[](2);

    _threeDimensionalStruct[0][0][0] = 10;
    _threeDimensionalStruct[0][0][1] = 20;
    _threeDimensionalStruct[0][1][0] = 30;
    _threeDimensionalStruct[0][1][1] = 40;
    _threeDimensionalStruct[1][0][0] = 50;
    _threeDimensionalStruct[1][0][1] = 60;
    _threeDimensionalStruct[1][1][0] = 70;
    _threeDimensionalStruct[1][1][1] = 80;

    _contractTest.set_threeDimensionalArray(_threeDimensionalStruct);
    (uint256 _value) = _contractTest.threeDimensionalArray(0, 0, 0);
    assertEq(_value, 10);

    (_value) = _contractTest.threeDimensionalArray(0, 0, 1);
    assertEq(_value, 20);

    (_value) = _contractTest.threeDimensionalArray(0, 1, 0);
    assertEq(_value, 30);

    (_value) = _contractTest.threeDimensionalArray(0, 1, 1);
    assertEq(_value, 40);

    (_value) = _contractTest.threeDimensionalArray(1, 0, 0);
    assertEq(_value, 50);

    (_value) = _contractTest.threeDimensionalArray(1, 0, 1);
    assertEq(_value, 60);

    (_value) = _contractTest.threeDimensionalArray(1, 1, 0);
    assertEq(_value, 70);

    (_value) = _contractTest.threeDimensionalArray(1, 1, 1);
    assertEq(_value, 80);
  }

  function test_Call_ThreeDimensionalArray() public {
    uint256[][][] memory _threeDimensionalStruct = new uint256[][][](2);
    _threeDimensionalStruct[0] = new uint256[][](2);
    _threeDimensionalStruct[1] = new uint256[][](2);

    _threeDimensionalStruct[0][0] = new uint256[](2);
    _threeDimensionalStruct[0][1] = new uint256[](2);
    _threeDimensionalStruct[1][0] = new uint256[](2);
    _threeDimensionalStruct[1][1] = new uint256[](2);

    _threeDimensionalStruct[0][0][0] = 10;
    _threeDimensionalStruct[0][0][1] = 20;
    _threeDimensionalStruct[0][1][0] = 30;
    _threeDimensionalStruct[0][1][1] = 40;
    _threeDimensionalStruct[1][0][0] = 50;
    _threeDimensionalStruct[1][0][1] = 60;
    _threeDimensionalStruct[1][1][0] = 70;
    _threeDimensionalStruct[1][1][1] = 80;

    _contractTest.mock_call_threeDimensionalArray(0, 0, 0, _threeDimensionalStruct[0][0][0]);
    (uint256 _value) = _contractTest.threeDimensionalArray(0, 0, 0);
    assertEq(_value, 10);

    _contractTest.mock_call_threeDimensionalArray(0, 0, 1, _threeDimensionalStruct[0][0][1]);
    (_value) = _contractTest.threeDimensionalArray(0, 0, 1);
    assertEq(_value, 20);

    _contractTest.mock_call_threeDimensionalArray(0, 1, 0, _threeDimensionalStruct[0][1][0]);
    (_value) = _contractTest.threeDimensionalArray(0, 1, 0);
    assertEq(_value, 30);

    _contractTest.mock_call_threeDimensionalArray(0, 1, 1, _threeDimensionalStruct[0][1][1]);
    (_value) = _contractTest.threeDimensionalArray(0, 1, 1);
    assertEq(_value, 40);

    _contractTest.mock_call_threeDimensionalArray(1, 0, 0, _threeDimensionalStruct[1][0][0]);
    (_value) = _contractTest.threeDimensionalArray(1, 0, 0);
    assertEq(_value, 50);

    _contractTest.mock_call_threeDimensionalArray(1, 0, 1, _threeDimensionalStruct[1][0][1]);
    (_value) = _contractTest.threeDimensionalArray(1, 0, 1);
    assertEq(_value, 60);

    _contractTest.mock_call_threeDimensionalArray(1, 1, 0, _threeDimensionalStruct[1][1][0]);
    (_value) = _contractTest.threeDimensionalArray(1, 1, 0);
    assertEq(_value, 70);

    _contractTest.mock_call_threeDimensionalArray(1, 1, 1, _threeDimensionalStruct[1][1][1]);
    (_value) = _contractTest.threeDimensionalArray(1, 1, 1);
    assertEq(_value, 80);
  }

  function test_Set_TwoDimensionalStringArray() public {
    string[][] memory _twoDimensionalStringArray = new string[][](2);
    _twoDimensionalStringArray[0] = new string[](2);
    _twoDimensionalStringArray[1] = new string[](2);

    _twoDimensionalStringArray[0][0] = '10';
    _twoDimensionalStringArray[0][1] = '20';
    _twoDimensionalStringArray[1][0] = '30';
    _twoDimensionalStringArray[1][1] = '40';

    _contractTest.set_twoDimensionalStringArray(_twoDimensionalStringArray);
    (string memory _value) = _contractTest.twoDimensionalStringArray(0, 0);
    assertEq(_value, '10');

    (_value) = _contractTest.twoDimensionalStringArray(0, 1);
    assertEq(_value, '20');

    (_value) = _contractTest.twoDimensionalStringArray(1, 0);
    assertEq(_value, '30');

    (_value) = _contractTest.twoDimensionalStringArray(1, 1);
    assertEq(_value, '40');
  }

  function test_Call_TwoDimensionalStringArray() public {
    string[][] memory _twoDimensionalStringArray = new string[][](2);
    _twoDimensionalStringArray[0] = new string[](2);
    _twoDimensionalStringArray[1] = new string[](2);

    _twoDimensionalStringArray[0][0] = '10';
    _twoDimensionalStringArray[0][1] = '20';
    _twoDimensionalStringArray[1][0] = '30';
    _twoDimensionalStringArray[1][1] = '40';

    _contractTest.mock_call_twoDimensionalStringArray(0, 0, _twoDimensionalStringArray[0][0]);
    (string memory _value) = _contractTest.twoDimensionalStringArray(0, 0);
    assertEq(_value, '10');

    _contractTest.mock_call_twoDimensionalStringArray(0, 1, _twoDimensionalStringArray[0][1]);
    (_value) = _contractTest.twoDimensionalStringArray(0, 1);
    assertEq(_value, '20');

    _contractTest.mock_call_twoDimensionalStringArray(1, 0, _twoDimensionalStringArray[1][0]);
    (_value) = _contractTest.twoDimensionalStringArray(1, 0);
    assertEq(_value, '30');

    _contractTest.mock_call_twoDimensionalStringArray(1, 1, _twoDimensionalStringArray[1][1]);
    (_value) = _contractTest.twoDimensionalStringArray(1, 1);
    assertEq(_value, '40');
  }
}
