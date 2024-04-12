import {
  FunctionDefinition,
  VariableDeclaration,
  ParameterList,
  ContractDefinition,
  ImportDirective,
  SymbolAlias,
  Identifier,
  TypeName,
  ArrayTypeName,
  Mapping,
  UserDefinedTypeName,
} from 'solc-typed-ast';

export function mockFunctionDefinition(mockFunctionDefinition: Partial<FunctionDefinition>): FunctionDefinition {
  return mockFunctionDefinition as FunctionDefinition;
}

export function mockParameterList(mockParameterList: Partial<ParameterList>): ParameterList {
  return mockParameterList as ParameterList;
}

export function mockVariableDeclaration(mockVariableDeclaration: Partial<VariableDeclaration>): VariableDeclaration {
  return mockVariableDeclaration as VariableDeclaration;
}

export function mockContractDefinition(mockContractDefinition: Partial<ContractDefinition>): ContractDefinition {
  return mockContractDefinition as ContractDefinition;
}

export function mockImportDirective(mockImportDirective: Partial<ImportDirective>): ImportDirective {
  return mockImportDirective as ImportDirective;
}

export function mockSymbolAliases(mockSymbolAliases: Partial<SymbolAlias[]>): SymbolAlias[] {
  return mockSymbolAliases as SymbolAlias[];
}

export function mockIdentifier(mockIdentifier: Partial<Identifier>): Identifier {
  return mockIdentifier as Identifier;
}

export function mockArrayTypeName(mockArrayTypeName: Partial<ArrayTypeName>): ArrayTypeName {
  return mockArrayTypeName as ArrayTypeName;
}

export function mockTypeName(mockTypeName: Partial<TypeName>): TypeName {
  return mockTypeName as TypeName;
}

export function mockMapping(mockMapping: Partial<Mapping>): Mapping {
  return mockMapping as Mapping;
}

export function mockUserDefinedTypeName(mockTypeName: Partial<UserDefinedTypeName>): UserDefinedTypeName {
  return mockTypeName as UserDefinedTypeName;
}
