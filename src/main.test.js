import { highlightWords } from './main';

describe('highlightWords', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <p>This is a test paragraph with some words.</p>
        <span>Another test with different words.</span>
      </div>
    `;
  });

  test('highlights the specified word', () => {
    highlightWords('test');
    expect(document.body.innerHTML).toContain('<mark>test</mark>');
    expect(document.body.innerHTML.match(/<mark>test<\/mark>/g)).toHaveLength(2);
  });

  test('does not highlight when word is not found', () => {
    highlightWords('nonexistent');
    expect(document.body.innerHTML).not.toContain('<mark>');
  });

  test('handles multiple occurrences of the word', () => {
    highlightWords('with');
    expect(document.body.innerHTML.match(/<mark>with<\/mark>/g)).toHaveLength(2);
  });
});
