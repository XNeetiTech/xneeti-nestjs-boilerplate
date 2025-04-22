// Commit Convention

// This repository uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages with enhanced rules for better readability and consistency.

// ### Commit Structure
// ```
// <type>[optional scope]: <description>

// [optional body]

// [optional footer(s)]
// ```

// ### Commit Rules
// - Types must be one of: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
// - Header line must not exceed 100 characters
// - Subject must not end with a period
// - Subject must be in lowercase (not sentence case, pascal case, etc.)
// - Body and footer should have a leading blank line
// - Body and footer lines should not exceed 100 characters
// - Scope (like auth, user) must be in lowercase

// ### How to Commit
// Use the provided commit script to ensure your commits follow the convention:



module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'chore',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'revert',
          'style',
          'test',
        ],
      ],
      'body-leading-blank': [1, 'always'],
      'body-max-line-length': [2, 'always', 100],
      'footer-leading-blank': [1, 'always'],
      'footer-max-line-length': [2, 'always', 100],
      'header-max-length': [2, 'always', 100],
      'scope-case': [2, 'always', 'lower-case'],
      'subject-case': [
        2,
        'never',
        ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
      ],
      'subject-empty': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'type-case': [2, 'always', 'lower-case'],
      'type-empty': [2, 'never'],
    },
  };