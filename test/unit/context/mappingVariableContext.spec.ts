import { StateVariableVisibility } from 'solc-typed-ast';
import { mockArrayTypeName, mockMapping, mockTypeName, mockVariableDeclaration } from '../../mocks';
import { mappingVariableContext } from '../../../src/context';
import { expect } from 'chai';

describe('mappingVariableContext', () => {
  const defaultAttributes = {
    name: 'testMappingVariable',
    typeString: 'mapping(uint256 => uint256)',
    vType: mockMapping({ vKeyType: mockTypeName({ typeString: 'uint256' }), vValueType: mockTypeName({ typeString: 'uint256' }) }),
    visibility: StateVariableVisibility.Default,
  };

  it('should return the correct context for a non-struct non-array mapping', () => {
    const node = mockVariableDeclaration(defaultAttributes);
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256',
        baseType: 'uint256',
      },
      isInternal: false,
      isArray: false,
      isStructArray: false,
    });
  });

  it('should return the correct context for a struct mapping', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => struct MyStruct)',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockTypeName({ typeString: 'struct MyStruct' }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'MyStruct memory',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'MyStruct memory',
        baseType: 'MyStruct memory',
      },
      isInternal: false,
      isArray: false,
      isStructArray: false,
    });
  });

  it('should return the correct context for an array mapping', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => uint256[])',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'uint256' }), typeString: 'uint256[]' }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256[] memory',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256[] memory',
        baseType: 'uint256',
      },
      isInternal: false,
      isArray: true,
      isStructArray: false,
    });
  });

  it('should return the correct context for an internal mapping', () => {
    const node = mockVariableDeclaration({ ...defaultAttributes, visibility: StateVariableVisibility.Internal });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'uint256',
        baseType: 'uint256',
      },
      isInternal: true,
      isArray: false,
      isStructArray: false,
    });
  });

  it('should return the correct context for a struct array mapping', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => struct MyStruct[])',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'struct MyStruct' }), typeString: 'struct MyStruct[]' }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'MyStruct[] memory',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256'],
        valueType: 'MyStruct[] memory',
        baseType: 'MyStruct memory',
      },
      isInternal: false,
      isArray: true,
      isStructArray: true,
    });
  });

  it('should return the correct context for a nested mapping', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => mapping(uint256 => uint256))',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockMapping({
          typeString: 'mapping(uint256 => uint256)',
          vKeyType: mockTypeName({ typeString: 'uint256' }),
          vValueType: mockTypeName({ typeString: 'uint256' }),
        }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint256'],
        valueType: 'uint256',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint256'],
        valueType: 'uint256',
        baseType: 'uint256',
      },
      isInternal: false,
      isArray: false,
      isStructArray: false,
    });
  });

  it('should return the correct context for a nested struct array mapping', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => mapping(uint256 => struct MyStruct[]))',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockMapping({
          typeString: 'mapping(uint256 => struct MyStruct[])',
          vKeyType: mockTypeName({ typeString: 'uint256' }),
          vValueType: mockArrayTypeName({ vBaseType: mockTypeName({ typeString: 'struct MyStruct' }), typeString: 'struct MyStruct[]' }),
        }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint256'],
        valueType: 'MyStruct[] memory',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint256'],
        valueType: 'MyStruct[] memory',
        baseType: 'MyStruct memory',
      },
      isInternal: false,
      isArray: true,
      isStructArray: true,
    });
  });

  it('should return the correct context for a triple nested mapping with different types', () => {
    const node = mockVariableDeclaration({
      ...defaultAttributes,
      typeString: 'mapping(uint256 => mapping(uint128 => mapping(uint64 => uint8)))',
      vType: mockMapping({
        vKeyType: mockTypeName({ typeString: 'uint256' }),
        vValueType: mockMapping({
          typeString: 'mapping(uint128 => mapping(uint64 => uint8)))',
          vKeyType: mockTypeName({ typeString: 'uint128' }),
          vValueType: mockMapping({
            typeString: 'mapping(uint64 => uint8)',
            vKeyType: mockTypeName({ typeString: 'uint64' }),
            vValueType: mockTypeName({ typeString: 'uint8' }),
          }),
        }),
      }),
    });
    const context = mappingVariableContext(node);

    expect(context).to.eql({
      setFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint128', 'uint64'],
        valueType: 'uint8',
      },
      mockFunction: {
        functionName: 'testMappingVariable',
        keyTypes: ['uint256', 'uint128', 'uint64'],
        valueType: 'uint8',
        baseType: 'uint8',
      },
      isInternal: false,
      isArray: false,
      isStructArray: false,
    });
  });
});
