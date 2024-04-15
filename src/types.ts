import { FunctionDefinition } from 'solc-typed-ast';

export const userDefinedTypes = ['contract', 'enum', 'struct'];
export const explicitTypes = ['string', 'bytes', 'mapping', 'struct'];

// Contexts to pass to Handlebars templates
export interface ConstructorContext {
  parameters: string;
  parameterNames: string;
  contractName: string;
}

export interface ExternalFunctionContext {
  functionName: string;
  signature: string;
  parameters: string;
  inputs: string;
  outputs: string;
  inputNames: string[];
  outputNames: string[];
  visibility: string;
  stateMutability: string;
  implemented: boolean;
  overrides?: string;
}

export interface InternalFunctionContext extends Omit<ExternalFunctionContext, 'visibility' | 'stateMutability'> {
  inputTypes: string[];
  outputTypes: string[];
  isView: boolean;
}

export interface ImportContext {
  absolutePath: string;
  namedImports?: (string | number)[];
}

export interface MappingVariableContext {
  setFunction: {
    functionName: string;
    keyTypes: string[];
    valueType: string;
  };
  mockFunction: {
    functionName: string;
    keyTypes: string[];
    valueType: string;
    baseType: string;
    structFields?: string[];
  };
  isInternal: boolean;
  isArray: boolean;
  isStruct: boolean;
  isStructArray: boolean;
  hasNestedMapping: boolean;
}

export interface ArrayVariableContext {
  setFunction: {
    functionName: string;
    arrayType: string;
    paramName: string;
  };
  mockFunction: {
    functionName: string;
    arrayType: string;
    baseType: string;
    structFields?: string[];
  };
  isInternal: boolean;
  isStructArray: boolean;
}

export interface StateVariableContext {
  isInternal: boolean;
  isStruct: boolean;
  setFunction: {
    functionName: string;
    paramType: string;
    paramName: string;
  };
  mockFunction: {
    functionName: string;
    paramType: string;
    structFields?: string[];
  };
}
interface Selector {
  implemented: boolean;
  contracts?: Set<string>;
  function?: FunctionDefinition;
}

export interface SelectorsMap {
  [selector: string]: Selector;
}

export type FullFunctionDefinition = FunctionDefinition & { selectors: SelectorsMap };
