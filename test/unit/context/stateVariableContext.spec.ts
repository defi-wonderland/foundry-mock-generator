import { DataLocation, StateVariableVisibility } from 'solc-typed-ast';
import { mockVariableDeclaration } from '../../mocks';
import { stateVariableContext } from '../../../src/context';
import { expect } from 'chai';

describe('stateVariableContext', () => {
  const defaultAttributes = {
    name: 'testStateVariable',
    typeString: 'uint256',
    visibility: StateVariableVisibility.Default,
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
      },
      isInternal: false,
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
      },
      isInternal: true,
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
      },
      isInternal: false,
    });
  });
});
