# Code Quality, Linting & Development Tools

<p align="right"><em>&lt;Last updated: 2025-10-20&gt;</em></p>

Maintaining a consistent codebase is critical for collaboration, readability, and long-term maintainability. This guide
introduces the essential tools used to enforce **code style**, **automate formatting**, and **catch potential errors
early** during development.

By integrating these tools into your workflow, you can:
  - **Ensure consistent code style and formatting** across the entire codebase
  - **Automatically fix minor style issues** before they reach version control
  - **Detect potential bugs, anti-patterns, and unsafe code** early in development
  - **Automate repetitive tasks** such as linting, formatting, or testing before commit
  - **Enhance developer experience and review efficiency** through cleaner, more reliable code

************


## 🧰 Linting and Development Tools

<dl>
  <dt>

### ![Prettier](../../_assets/icons/prettier-14.png) [Prettier](prettier.md)

  </dt><dd>

An opinionated code formatter that **automatically rewrites your code** to match a **consistent style**.

**Use Cases:**
  - Enforce consistent formatting across all files (spaces, quotes, trailing commas, etc.)
  - Automatically fix minor styling issues during save or commit
  - Improve readability without debating style in code reviews

  </dd><dt>

### ![ESLint](../../_assets/icons/eslint-14.png) [ESLint](eslint.md)

  </dt><dd>

A powerful linter for **identifying and fixing problems** in **JavaScript**/**TypeScript** code.

**Use Cases:**
  - Enforce consistent code quality, best practices and team-wide standards
  - Catch bugs, anti-patterns, and risky constructs early during development
  - Improve code readability and maintainability by enforcing structural consistency
  - Prevent common mistakes (e.g., unused variables, unreachable code, incorrect type usage)

  </dd><dt>

###  🐶 [Husky](husky.md)

  </dt><dd>

A **Git hook manager** that lets you **run scripts automatically before commits, pushes, or merges** — helping enforce
code standards and prevent bad code from entering the repository.

**Use Cases:**
  -	Run formatting or testing tasks and validate commit messages automatically
  -	Enforce code quality checks before commits (`pre-commit`) or pushes (`pre-push`)
  -	Prevent code with errors or inconsistent styles from being committed
  - Automate common Git workflows like installing dependencies or running setup scripts after pull or checkout

  </dd>
</dl>
