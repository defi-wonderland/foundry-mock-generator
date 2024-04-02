import { expect } from 'chai';
import { mockContractDefinition, mockFunctionDefinition, mockParameterList, mockVariableDeclaration } from '../../mocks';
import { constructorContext } from '../../../src/context';
import { DataLocation } from 'solc-typed-ast';

describe('constructorContext', () => {
  const defaultAttributes = {
    name: 'constructor',
    isConstructor: true,
    vParameters: mockParameterList({ vParameters: [] }),
    vScope: mockContractDefinition({ name: 'TestContract' }),
  };

  it('throws an error if the node is not a constructor', () => {
    const node = mockFunctionDefinition({ ...defaultAttributes, isConstructor: false });
    expect(() => constructorContext(node)).to.throw('The node is not a constructor');
  });

  it('processes constructors without parameters', () => {
    const node = mockFunctionDefinition(defaultAttributes);
    const context = constructorContext(node);

    expect(context).to.eql({
      contractName: 'TestContract',
      parameters: '',
      parameterNames: '',
    });
  });

  it('processes constructors with named parameters', () => {
    const parameters = [
      mockVariableDeclaration({ name: 'a', typeString: 'uint256' }),
      mockVariableDeclaration({ name: 'b', typeString: 'boolean' }),
    ];
    const node = mockFunctionDefinition({ ...defaultAttributes, vParameters: mockParameterList({ vParameters: parameters }) });
    const context = constructorContext(node);

    expect(context).to.eql({
      contractName: 'TestContract',
      parameters: 'uint256 a, boolean b',
      parameterNames: 'a, b',
    });
  });

  it('processes constructors with unnamed parameters', () => {
    const parameters = [mockVariableDeclaration({ typeString: 'uint256' }), mockVariableDeclaration({ typeString: 'boolean' })];
    const node = mockFunctionDefinition({ ...defaultAttributes, vParameters: mockParameterList({ vParameters: parameters }) });
    const context = constructorContext(node);

    expect(context).to.eql({
      contractName: 'TestContract',
      parameters: 'uint256 _param0, boolean _param1',
      parameterNames: '_param0, _param1',
    });
  });

  it('recognizes storage location of parameters', () => {
    const parameters = [
      mockVariableDeclaration({ name: 'a', typeString: 'uint256', storageLocation: DataLocation.Memory }),
      mockVariableDeclaration({ name: 'b', typeString: 'boolean', storageLocation: DataLocation.CallData }),
    ];
    const node = mockFunctionDefinition({ ...defaultAttributes, vParameters: mockParameterList({ vParameters: parameters }) });
    const context = constructorContext(node);

    expect(context).to.eql({
      contractName: 'TestContract',
      parameters: 'uint256 memory a, boolean calldata b',
      parameterNames: 'a, b',
    });
  });
});
