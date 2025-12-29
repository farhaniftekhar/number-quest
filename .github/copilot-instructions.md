# GitHub Copilot Instructions for number-quest

This file provides guidance to GitHub Copilot for generating code in this repository.

## Code Style and Standards

### General Principles
- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principles
- Use meaningful variable and function names that clearly describe their purpose
- Keep functions small and focused on a single responsibility
- Add comments only when necessary to explain complex logic or "why" rather than "what"

### Code Formatting
- Use consistent indentation (prefer 2 or 4 spaces depending on language conventions)
- Follow language-specific style guides (e.g., PEP 8 for Python, ESLint for JavaScript)
- Keep lines to a reasonable length (typically 80-120 characters)

## Security Best Practices

### General Security
- Never commit secrets, API keys, passwords, or sensitive credentials to the repository
- Use environment variables for configuration and sensitive data
- Validate and sanitize all user inputs to prevent injection attacks
- Use parameterized queries for database operations
- Set appropriate file permissions and access controls

### Web Security (if applicable)
- Use HTTPS for all external communications
- Implement proper authentication and authorization
- Set secure cookie flags: `httpOnly`, `secure`, and `sameSite: 'strict'`
- Implement CSRF protection for state-changing operations
- Use Content Security Policy (CSP) headers

## Testing Requirements

### Test Coverage
- Write unit tests for all new functionality
- Aim for meaningful test coverage (focus on critical paths)
- Test edge cases and error conditions
- Keep tests isolated and independent

### Test Organization
- Place tests near the code they test or in a dedicated test directory
- Use descriptive test names that explain what is being tested
- Follow Arrange-Act-Assert (AAA) pattern in tests
- Mock external dependencies appropriately

## Documentation

### Code Documentation
- Write clear docstrings/comments for public APIs and complex functions
- Keep README.md up to date with setup instructions and usage examples
- Document any non-obvious design decisions

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 50 characters when possible
- Add detailed description if necessary

## Dependencies and Libraries

### Adding Dependencies
- Only add dependencies when necessary
- Prefer well-maintained and widely-used libraries
- Check for security vulnerabilities before adding new dependencies
- Keep dependencies up to date

### Dependency Management
- Use lock files to ensure reproducible builds
- Document any special installation or setup requirements

## Error Handling

- Handle errors gracefully and provide meaningful error messages
- Don't swallow exceptions without proper logging
- Use appropriate error types and status codes
- Log errors with sufficient context for debugging

## Performance Considerations

- Avoid premature optimization, but be mindful of obvious performance issues
- Use appropriate data structures and algorithms
- Consider scalability in design decisions
- Profile and measure before optimizing

## Git Practices

### Branching
- Create feature branches for new work
- Keep commits atomic and focused
- Review changes before committing

### Pull Requests
- Ensure all tests pass before creating a pull request
- Write clear PR descriptions explaining the changes
- Address review feedback promptly

## Project-Specific Guidelines

This repository is for the "number-quest" project. As the project evolves:
- Update these instructions to reflect established patterns and conventions
- Add specific frameworks, libraries, or tools preferences
- Include project-specific architecture decisions
- Document any unique workflows or processes

## Questions and Clarifications

When in doubt:
- Follow existing code patterns in the repository
- Prefer simplicity over complexity
- Ask for clarification if requirements are unclear
- Reference official documentation for libraries and frameworks used
