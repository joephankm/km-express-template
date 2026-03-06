# 🔀 Git Workflow Tools

<p align="right"><em>&lt;Last updated: 2026-03-06&gt;</em></p>

Tools that integrate with the Git workflow to automate checks, enforce code quality, and streamline development
processes during commits, pushes, and other repository events.

By integrating these tools into your workflow, you can:
  - **Run scripts automatically** on Git events such as `pre-commit`, `pre-push`, or `commit-msg`.
  - **Target only changed files** to keep pre-commit hooks fast and focused.
  - **Enforce team standards consistently** across all contributors without manual discipline.
  - **Automate repetitive workflow tasks** and eliminate human error during routine Git operations.

************

[⬆️ **Table of Contents**](../-contents.md)

************


<dl>
  <dt>

### 🐶 [Husky](husky.md)

  </dt>
  <dd>

A **Git hook manager** that lets you **run scripts automatically before commits, pushes, or merges** — helping enforce
code standards and prevent bad code from entering the repository.

**Use Cases:**
  - Run formatting or testing tasks and validate commit messages automatically.
  - Enforce code quality checks before commits (`pre-commit`) or pushes (`pre-push`).
  - Prevent code with errors or inconsistent styles from being committed.
  - Automate common Git workflows like installing dependencies or running setup scripts after pull or checkout.

  </dd>
  <dt>

### ![Lint-Staged](../_static/icons/lint-staged-16.png) [Lint-Staged](lint-staged.md)

  </dt>
  <dd>

A utility that **runs linting and formatting tasks** only **on files that are staged in Git**, making pre-commit checks
fast, focused, and safe.

It is commonly used together with **Husky** to ensure code quality checks apply only to **changed files**, instead of
the entire codebase.

**Use Cases:**
  - Run ESLint and Prettier only on staged files before commit.
  - Keep pre-commit hooks fast by avoiding full-project linting.
  - Automatically fix and re-stage formatted files.
  - Prevent commits containing lint errors or inconsistent formatting.
  - Reduce noise and speed up developer workflows in large codebases.

  </dd>
</dl>
