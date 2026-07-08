import { describe, it, expect } from 'vitest'
import { createSmartRegex } from '../calculator'

/**
 * Regression test suite for createSmartRegex.
 *
 * This function converts a user search query into a RegExp that:
 *  - Is case-insensitive
 *  - Makes word-final 's' optional for plural/singular tolerance
 *  - Supports regex alternation (pipes) and other regex features
 *  - Gracefully avoids breaking regex escape sequences like \s
 */
describe('createSmartRegex', () => {
  // ── Basic matching ──────────────────────────────────────────────
  describe('basic text matching', () => {
    it('matches a simple word case-insensitively', () => {
      const regex = createSmartRegex('ingot')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('copper ingot')).toBe(true)
      expect(regex.test('COPPER INGOT')).toBe(true)
    })

    it('does not match unrelated strings', () => {
      const regex = createSmartRegex('ingot')
      expect(regex.test('Copper Ore')).toBe(false)
      expect(regex.test('Wire')).toBe(false)
    })
  })

  // ── Pipe (alternation) support ──────────────────────────────────
  describe('pipe alternation', () => {
    it('matches either side of a pipe: ingot|ore', () => {
      const regex = createSmartRegex('ingot|ore')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('Iron Ore')).toBe(true)
      expect(regex.test('Gold Ingot')).toBe(true)
      expect(regex.test('Gold Ore')).toBe(true)
    })

    it('does not match items outside the alternation', () => {
      const regex = createSmartRegex('ingot|ore')
      expect(regex.test('Wire')).toBe(false)
      expect(regex.test('Glass')).toBe(false)
      expect(regex.test('Copper Nugget')).toBe(false)
    })

    it('handles three-way alternation: ingot|ore|nugget', () => {
      const regex = createSmartRegex('ingot|ore|nugget')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('Iron Ore')).toBe(true)
      expect(regex.test('Copper Nugget')).toBe(true)
      expect(regex.test('Wire')).toBe(false)
    })
  })

  // ── Plural tolerance (smart 's') ───────────────────────────────
  describe('plural tolerance', () => {
    it('searching "ingots" matches singular "Ingot"', () => {
      const regex = createSmartRegex('ingots')
      expect(regex.test('Copper Ingot')).toBe(true)
    })

    it('searching "ingots" also matches plural "Ingots"', () => {
      const regex = createSmartRegex('ingots')
      expect(regex.test('Copper Ingots')).toBe(true)
    })

    it('searching "ores" matches singular "Ore"', () => {
      const regex = createSmartRegex('ores')
      expect(regex.test('Copper Ore')).toBe(true)
    })

    it('searching "ingots|ores" matches both singular forms', () => {
      const regex = createSmartRegex('ingots|ores')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('Iron Ore')).toBe(true)
    })

    it('searching "nuggets" matches "Nugget"', () => {
      const regex = createSmartRegex('nuggets')
      expect(regex.test('Copper Nugget')).toBe(true)
    })
  })

  // ── Words that naturally end in 's' ─────────────────────────────
  describe('words naturally ending in s', () => {
    it('"glass" matches "Glass" (exact match)', () => {
      const regex = createSmartRegex('glass')
      expect(regex.test('Glass')).toBe(true)
    })

    it('"gas" matches "Gas Canister"', () => {
      const regex = createSmartRegex('gas')
      expect(regex.test('Gas Canister')).toBe(true)
    })
  })

  // ── Regex escape sequences are not broken ──────────────────────
  describe('regex escape sequences', () => {
    it('\\s is not broken by the smart plural logic', () => {
      // \s should match whitespace, not have the s made optional
      const regex = createSmartRegex('Copper\\sIngot')
      expect(regex.test('Copper Ingot')).toBe(true)
      // Should NOT match "CopperIngot" (no space) since \s requires whitespace
      expect(regex.test('CopperIngot')).toBe(false)
    })

    it('\\S is not broken by the smart plural logic', () => {
      const regex = createSmartRegex('\\S+')
      expect(regex.test('Wire')).toBe(true)
    })
  })

  // ── Regex special characters ────────────────────────────────────
  describe('regex features', () => {
    it('supports dot as any character', () => {
      const regex = createSmartRegex('Copper .ngot')
      expect(regex.test('Copper Ingot')).toBe(true)
    })

    it('supports anchors', () => {
      const regex = createSmartRegex('^Copper')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('Iron Copper')).toBe(false) // ^ means start
    })

    it('supports character classes', () => {
      const regex = createSmartRegex('[CI]opper')
      expect(regex.test('Copper Ingot')).toBe(true)
    })

    it('supports quantifiers', () => {
      const regex = createSmartRegex('Cop+er')
      expect(regex.test('Copper Ingot')).toBe(true)
    })
  })

  // ── Invalid regex falls through to RegExp constructor error ─────
  describe('invalid regex', () => {
    it('throws on invalid regex (caller handles fallback)', () => {
      // An unclosed group should throw
      expect(() => createSmartRegex('foo(')).toThrow()
    })
  })

  // ── Edge cases ──────────────────────────────────────────────────
  describe('edge cases', () => {
    it('empty string matches everything', () => {
      const regex = createSmartRegex('')
      expect(regex.test('Copper Ingot')).toBe(true)
      expect(regex.test('')).toBe(true)
    })

    it('single character "s" is NOT transformed (no preceding letter for lookbehind)', () => {
      // A lone "s" has no preceding letter, so the lookbehind doesn't match.
      // It stays as literal "s" and only matches strings containing 's'.
      const regex = createSmartRegex('s')
      expect(regex.test('Glass')).toBe(true)   // contains 's'
      expect(regex.test('Wire')).toBe(false)    // no 's'
    })

    it('mid-word s is not made optional', () => {
      // The 's' in "Steel" is not word-final, so it should NOT be made optional
      const regex = createSmartRegex('steel')
      const pattern = regex.source
      // The 's' should not have been transformed since it's not at a word boundary
      expect(pattern).not.toContain('s?teel')
      // But it should still match
      expect(regex.test('Steel Ingot')).toBe(true)
    })

    it('uppercase S in query is handled correctly', () => {
      const regex = createSmartRegex('INGOTS')
      expect(regex.test('Copper Ingot')).toBe(true)  // S made optional, case-insensitive
      expect(regex.test('Copper Ingots')).toBe(true)
    })
  })
})
