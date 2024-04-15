import { DataLocation, StateVariableVisibility } from 'solc-typed-ast';
import { mockTypeName, mockUserDefinedTypeName, mockVariableDeclaration } from '../../mocks';
import { stateVariableContext } from '../../../src/context';
import { expect } from 'chai';

describe('stateVariableContext', () => {
  const defaultAttributes = {
    name: 'testStateVariable',
    typeString: 'uint256',
    visibility: StateVariableVisibility.Default,
    vType: mockVariableDeclaration({ typeString: 'uint256' }),
  };

  it('processes state variables', () => {
    const node = mockVariableDeclaration(defaultAttributes);
    const context = stateVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testStateVariable',
        paramType: 'uint256',
        paramName: 'testStateVariable',
      },
      mockFunction: {
        functionName: 'testStateVariable',
        paramType: 'uint256',
        structFields: null,
      },
      isInternal: false,
      isStruct: false,
    });
  });

  it('processes internal state variables', () => {
    const node = mockVariableDeclaration({ ...defaultAttributes, visibility: StateVariableVisibility.Internal });
    const context = stateVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testStateVariable',
        paramType: 'uint256',
        paramName: 'testStateVariable',
      },
      mockFunction: {
        functionName: 'testStateVariable',
        paramType: 'uint256',
        structFields: null,
      },
      isInternal: true,
      isStruct: false,
    });
  });

  it('recognizes storage location of parameters', () => {
    const node = mockVariableDeclaration({ ...defaultAttributes, typeString: 'string', storageLocation: DataLocation.Memory });
    const context = stateVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testStateVariable',
        paramType: 'string memory',
        paramName: 'testStateVariable',
      },
      mockFunction: {
        functionName: 'testStateVariable',
        paramType: 'string memory',
        structFields: null,
      },
      isInternal: false,
      isStruct: false,
    });
  });

  it('processes struct state variables', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'struct MyStruct',
      vType: mockUserDefinedTypeName({
        typeString: 'struct MyStruct',
        vReferencedDeclaration: mockUserDefinedTypeName({
          children: [
            mockVariableDeclaration({ name: 'field1', typeString: 'mapping(uint256 => uint256)' }),
            mockVariableDeclaration({ name: 'field2', typeString: 'uint256)' }),
          ],
        }),
      }),
    });
    const context = stateVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testStateVariable',
        paramType: 'MyStruct memory',
        paramName: 'testStateVariable',
      },
      mockFunction: {
        functionName: 'testStateVariable',
        paramType: 'MyStruct memory',
        structFields: ['field1', 'field2'],
      },
      isInternal: false,
      isStruct: true,
    });
  });
});
