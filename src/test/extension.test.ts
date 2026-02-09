import * as assert from 'assert';
import { cssToRfs, rfsToCss } from '../extension';

suite('cssToRfs', () => {
	test('converts a simple property', () => {
		assert.strictEqual(cssToRfs('font-size: 2rem;'), '@include rfs(2rem, font-size);');
	});

	test('converts a property without trailing semicolon', () => {
		assert.strictEqual(cssToRfs('font-size: 2rem'), '@include rfs(2rem, font-size);');
	});

	test('preserves leading indentation', () => {
		assert.strictEqual(cssToRfs('  padding: 1.5rem;'), '  @include rfs(1.5rem, padding);');
	});

	test('preserves tab indentation', () => {
		assert.strictEqual(cssToRfs('\tmargin: 10px;'), '\t@include rfs(10px, margin);');
	});

	test('handles multi-value properties', () => {
		assert.strictEqual(cssToRfs('margin: 10px 20px;'), '@include rfs(10px 20px, margin);');
	});

	test('handles hyphenated properties', () => {
		assert.strictEqual(cssToRfs('font-size: 1.25rem;'), '@include rfs(1.25rem, font-size);');
	});

	test('returns null for empty lines', () => {
		assert.strictEqual(cssToRfs(''), null);
	});

	test('returns null for non-CSS lines', () => {
		assert.strictEqual(cssToRfs('// this is a comment'), null);
	});

	test('returns null for lines that are already RFS', () => {
		assert.strictEqual(cssToRfs('@include rfs(2rem, font-size);'), null);
	});
});

suite('rfsToCss', () => {
	test('converts a simple RFS include', () => {
		assert.strictEqual(rfsToCss('@include rfs(2rem, font-size);'), 'font-size: 2rem;');
	});

	test('converts without trailing semicolon', () => {
		assert.strictEqual(rfsToCss('@include rfs(2rem, font-size)'), 'font-size: 2rem;');
	});

	test('preserves leading indentation', () => {
		assert.strictEqual(rfsToCss('  @include rfs(1.5rem, padding);'), '  padding: 1.5rem;');
	});

	test('preserves tab indentation', () => {
		assert.strictEqual(rfsToCss('\t@include rfs(10px, margin);'), '\tmargin: 10px;');
	});

	test('handles multi-value properties', () => {
		assert.strictEqual(rfsToCss('@include rfs(10px 20px, margin);'), 'margin: 10px 20px;');
	});

	test('handles hyphenated property names', () => {
		assert.strictEqual(rfsToCss('@include rfs(1.25rem, font-size);'), 'font-size: 1.25rem;');
	});

	test('returns null for empty lines', () => {
		assert.strictEqual(rfsToCss(''), null);
	});

	test('returns null for plain CSS lines', () => {
		assert.strictEqual(rfsToCss('font-size: 2rem;'), null);
	});

	test('returns null for non-matching lines', () => {
		assert.strictEqual(rfsToCss('// this is a comment'), null);
	});
});

suite('round-trip', () => {
	const cases = [
		'font-size: 2rem;',
		'  padding: 1.5rem;',
		'\tmargin: 10px;',
		'margin: 10px 20px;',
	];

	for (const original of cases) {
		test(`CSS -> RFS -> CSS: "${original.trim()}"`, () => {
			const rfs = cssToRfs(original);
			assert.ok(rfs !== null, 'cssToRfs should produce a result');
			const back = rfsToCss(rfs!);
			assert.strictEqual(back, original);
		});
	}
});
