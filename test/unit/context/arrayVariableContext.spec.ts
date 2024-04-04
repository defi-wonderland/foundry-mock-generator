import { expect } from 'chai';
import { DataLocation, StateVariableVisibility } from 'solc-typed-ast';
import { mockArrayTypeName, mockTypeName, mockVariableDeclaration } from '../../mocks';
import { arrayVariableContext } from '../../../src/context';

describe('arrayVariableContext', () => {
  const defaultAttributes = {
    name: 'testArrayVariable',
    typeString: 'uint256[]',
    vType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'uint256' }) }),
    visibility: StateVariableVisibility.Default,
  };

  it('should return the correct context for a non-struct array', () => {
    const node = mockVariableDeclaration(defaultAttributes);
    const context = arrayVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'uint256[] memory',
        paramName: 'testArrayVariable',
      },
      mockFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'uint256[] memory',
        baseType: 'uint256',
      },
      isInternal: false,
      isStructArray: false,
    });
  });

  it('should return the correct context for a struct array', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'struct MyStruct[]',
      vType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'struct MyStruct' }) }),
    });
    const context = arrayVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'MyStruct[] memory',
        paramName: 'testArrayVariable',
      },
      mockFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'MyStruct[] memory',
        baseType: 'MyStruct memory',
      },
      isInternal: false,
      isStructArray: true,
    });
  });

  it('should return the correct context for an internal array', () => {
    const node = mockVariableDeclaration({ ...defaultAttributes, visibility: StateVariableVisibility.Internal });
    const context = arrayVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'uint256[] memory',
        paramName: 'testArrayVariable',
      },
      mockFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'uint256[] memory',
        baseType: 'uint256',
      },
      isInternal: true,
      isStructArray: false,
    });
  });

  it('should return the correct context for an internal struct array', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'struct MyStruct[]',
      vType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'struct MyStruct' }) }),
      visibility: StateVariableVisibility.Internal,
    });
    const context = arrayVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'MyStruct[] memory',
        paramName: 'testArrayVariable',
      },
      mockFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'MyStruct[] memory',
        baseType: 'MyStruct memory',
      },
      isInternal: true,
      isStructArray: true,
    });
  });

  it('should return the correct context for an array with a memory storage location', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'string[]',
      vType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'string' }) }),
      storageLocation: DataLocation.Memory,
    });
    const context = arrayVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'string[] memory',
        paramName: 'testArrayVariable',
      },
      mockFunction: {
        functionName: 'testArrayVariable',
        arrayType: 'string[] memory',
        baseType: 'string memory',
      },
      isInternal: false,
      isStructArray: false,
    });
  });
});
