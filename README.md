# Foodshala

## Technologies used

- Language: Javascript 
- Database: - MongoDB
- Frameworks: Express 
- Libraries: -

## How to install?

```bash
npm install
```

## How to run?

Locally, for development

```bash
npm run dev 
```

## Coding Practice Followed

**Variable and Type Declarations**

- Always use `let` and `const` instead of `var` to declare a variable.
- Always specify data type of non-initialized variables.
- Use meaningful names for naming any variable.
- Used following case style for naming any variable:
  - PascalCase <- for class, interface and other type definitions,
  - camelCase <- for naming objects and vars, and
  - UPPERCASE <- for const and enums
- Any variable, constant or type name should not exceed 32 chars.

**Code formatting**

- Maintain a uniformity while coding.
- Always use semi-colon `;` at end of line of code.
- Use double quote `"` in HTML, CSS and JSON files and single quote `'` in JavaScript files.
- Used 2 spaces format for indentation. Always format code using VS Code format document option (Ctrl+Alt+F for windows) before committing the code (or use VS Code extension, named Prettier, for code formatting).
- Review, cleanup and remove redundant code before pushing changes to repository.

**Code Comments**

- Try to add comments wherever possible to enhance readability of your code.
- If you are using complex logic is complex anywhere referred from any online resource, add reference to it in comments.
- Leave any word of care or note in cases where you want to warn other developers about use of any logic, or comment out any existing logic.

**Git Practices**

- Never push any modifications directly on `master` or any other production branch.
- There are 3 kind of branch types. Use following prefix while creating any branch:
  - Feature branch - `feature/`
  - Hotfix branch - `hotfix/`
  - Release branch - `release/`
- Create a pull request and a reviewer when you are done with the development work and ready for code review.
- While committing your code, use proper and concise messages.
- Never check in secrets, passwords or protected URLs with code. Use env or other config file for saving confidential settings and don't push them on Git repositories.
