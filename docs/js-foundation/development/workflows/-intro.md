# 🧰 Development Workflows

<p align="right"><em>&lt;Last updated: 2026-06-02&gt;</em></p>

Step-by-step guides for setting up and understanding the **automated development pipelines** used in this project.
Each workflow walks through tool installation, configuration, and verification to get a repeatable process running
from scratch.

************

[⬆️ **Table of Contents**](../-contents.md)

************


<dl>
  <dt>

### 🏗️ [Code Quality Workflow](code-quality-workflow.md)

  </dt>
  <dd>

Set up the **automated code quality pipeline** that combines **Prettier**, **ESLint**, **Lint-Staged**, and **Husky**
to enforce consistent formatting and linting automatically on every commit.

**Covers:**
  - Configuring **Prettier** for consistent code formatting across all files.
  - Configuring **ESLint** with TypeScript support for static analysis and rule enforcement.
  - Wiring **Lint-Staged** to run checks only on staged files for fast pre-commit performance.
  - Integrating **Husky** to trigger the pipeline automatically on `pre-commit`.

  </dd>
</dl>
