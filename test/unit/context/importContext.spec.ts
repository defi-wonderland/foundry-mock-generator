import { expect } from 'chai';
import { importContext } from '../../../src/context';
import { mockImportDirective, mockSymbolAliases } from '../../mocks';
import { Identifier } from 'solc-typed-ast';

describe('importContext', () => {
  const absolutePath = '../contracts/MyContract.sol';

  const defaultAttributes = {
    symbolAliases: mockSymbolAliases([]),
    absolutePath,
  };

  it('returns the absolute path if there are no named imports', () => {
    const node = mockImportDirective(defaultAttributes);
    const context = importContext(node);

    expect(context).to.eql({
      absolutePath,
    });
  });

  it('returns the named imports and the absolute path', () => {
    const symbolAliases = mockSymbolAliases([
      { foreign: new Identifier(1, 'src', 'string', 'a', 2), local: null },
      { foreign: new Identifier(1, 'src', 'string', 'b', 2), local: null },
      { foreign: new Identifier(1, 'src', 'string', 'c', 2), local: null },
    ]);
    const node = mockImportDirective({ ...defaultAttributes, symbolAliases });
    const context = importContext(node);

    expect(context).to.eql({
      namedImports: ['a', 'b', 'c'],
      absolutePath,
    });
  });

  it('returns the symbol aliases without names', () => {
    const symbolAliases = mockSymbolAliases([
      { foreign: 1, local: null },
      { foreign: 2, local: null },
      { foreign: 3, local: null },
    ]);
    const node = mockImportDirective({ ...defaultAttributes, symbolAliases });
    const context = importContext(node);

    expect(context).to.eql({
      namedImports: [1, 2, 3],
      absolutePath,
    });
  });
});
