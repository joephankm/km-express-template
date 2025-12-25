# 🔀 Git Workflow Tools

<p align="right"><em>&lt;Last updated: 2025-12-25&gt;</em></p>

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
