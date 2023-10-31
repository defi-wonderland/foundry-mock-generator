import { ContractDefinitionNode, FunctionDefinitionNode, VariableDeclarationNode, ExternalFunctionOptions } from './types';

/**
 * Returns the infomration of the external function for the mock contract
 * @param contractNode The contract node that has all the nodes for the contract
 * @returns The infomration of the external function for the mock contract
 */
export const getExternalMockFunctions = (contractNode: ContractDefinitionNode): ExternalFunctionOptions[] => {
  // Filter the nodes and keep only the FunctionDefinition related ones
  const functionNodes = contractNode.nodes.filter((node) => node.nodeType === 'FunctionDefinition') as FunctionDefinitionNode[];

  // Get contract kind
  const contractKind = contractNode.contractKind;

  const externalFunctions: ExternalFunctionOptions[] = [];
  // Loop through the function nodes
  functionNodes.forEach((funcNode: FunctionDefinitionNode) => {
    // Check if the node is a function kind (not a constructor, modifier etc.)
    if (funcNode.kind != 'function') return;
    // Check if the function is external or public
    if (funcNode.visibility != 'external' && funcNode.visibility != 'public') return;

    // Save state mutability
    const stateMutability = funcNode.stateMutability;
    const stateMutabilityString = stateMutability == 'nonpayable' ? ' ' : ` ${stateMutability} `;

    // Get the parameters of the function, if there are no parameters then we use an empty array
    const parameters: VariableDeclarationNode[] = funcNode.parameters.parameters ? funcNode.parameters.parameters : [];

    // We save the parameters in an array with their types and storage location
    const functionParameters: string[] = [];
    // We save the parameters names in an other array
    const parameterNames: string[] = [];
    // We save the types in an array to use them in order to create the signature
    const parameterTypes: string[] = [];
    let parameterIndex = 0;
    parameters.forEach((parameter: VariableDeclarationNode) => {
      // If the storage location is memory or calldata then we keep it
      const storageLocation =
        parameter.storageLocation === 'memory' || parameter.storageLocation === 'calldata' ? `${parameter.storageLocation} ` : '';

      // We remove the 'contract ' string from the type name if it exists
      const typeName: string = parameter.typeDescriptions.typeString.replace(/contract |struct |enum /g, '');

      const paramName: string = parameter.name == '' ? `_param${parameterIndex}` : parameter.name;
      // We create the string that will be used in the constructor signature
      const parameterString = `${typeName} ${storageLocation}${paramName}`;

      parameterTypes.push(typeName);
      functionParameters.push(parameterString);
      parameterNames.push(paramName);
      parameterIndex++;
    });

    const signature = parameterTypes ? `${funcNode.name}(${parameterTypes.join(',')})` : `${funcNode.name}()`;

    const returnParameters: VariableDeclarationNode[] = funcNode.returnParameters.parameters ? funcNode.returnParameters.parameters : [];

    // We save the return parameters in an array with their types and storage location
    const functionReturnParameters: string[] = [];
    // We save the return parameters names in an other array
    const returnParameterNames: string[] = [];
    parameterIndex = 0;
    returnParameters.forEach((parameter: VariableDeclarationNode) => {
      // If the storage location is memory or calldata then we keep it
      const storageLocation =
        parameter.storageLocation === 'memory' || parameter.storageLocation === 'calldata' ? `${parameter.storageLocation} ` : '';

      // We remove the 'contract ' string from the type name if it exists
      const typeName: string = parameter.typeDescriptions.typeString.replace(/contract |struct |enum /g, '');

      const returnName: string = parameter.name == '' ? `_return${parameterIndex}` : parameter.name;
      // We create the string that will be used in the constructor signature
      const parameterString = `${typeName} ${storageLocation}${returnName}`;

      functionReturnParameters.push(parameterString);
      returnParameterNames.push(returnName);
      parameterIndex++;
    });

    // We create the string that will be used in the mock function signature
    const inputsString: string = functionParameters.length ? functionParameters.join(', ') : '';
    const outputsString: string = functionReturnParameters.length ? functionReturnParameters.join(', ') : '';

    // We create the strings that will be used in the mock call arguments and returns
    const inputsStringNames: string = parameterNames.length ? `, ${parameterNames.join(', ')}` : '';
    const outputsStringNames: string = returnParameterNames.length ? returnParameterNames.join(', ') : '';
    let args: string;

    if (!inputsString) {
      args = outputsString;
    } else if (!outputsString) {
      args = inputsString;
    } else {
      args = `${inputsString}, ${outputsString}`;
    }

    // Save the external function information
    const externalMockFunction: ExternalFunctionOptions = {
      functionName: funcNode.name,
      arguments: args,
      signature: signature,
      inputsStringNames: inputsStringNames,
      outputsStringNames: outputsStringNames,
      inputString: inputsString,
      outputString: outputsString,
      isInterface: contractKind === 'interface',
      stateMutabilityString: stateMutabilityString,
      abstractAndVirtual: contractNode.abstract && funcNode.virtual,
      visibility: funcNode.visibility,
    };

    externalFunctions.push(externalMockFunction);
  });

  return externalFunctions;
};
