# 🚀 How to Use This Template

This project is an **Express application template** that is ready to run out of the box. To start your own project
cleanly, it is recommended to reset the Git history after cloning.

The following steps walk you through **creating a new project from this template**.

***********


## 🛫 Create a Project from the Template

### ⓵. 📥 Clone the Template Repository

When using this template, you only need the **latest state** of the project, not its full Git history. Cloning a single
branch with a shallow history keeps the setup fast and avoids unnecessary commits.

```shell
git clone \
  --single-branch \
  --depth 1 \
  https://github.com/joephankm/km-express-template.git <your-project-name>

cd <your-project-name>
```

📙 `--single-branch` — Clones only that branch.\
📙 `--depth 1` — Fetches only the latest commit.

With the template cloned, proceed to [Getting Started](../README.md#-getting-started-) in README.md to install
dependencies and confirm everything is working.


### ⓶. 🕒 Reset Git History

This template is intended to be a **starting point**, not a fork of the original repository. To ensure your project
begins with a clean history, remove the existing Git metadata and initialize a new repository.

```shell
rm -rf .git
git init
```

Create the first commit for your project:

```shell
git add .
git commit -m "feat: initial commit 🎉"
```

From this point on, all commits belong exclusively to your project.

> ### 💡 _Descriptive Initial Commit_
>
> The short message `feat: initial commit` keeps the first commit concise and consistent. If you prefer to **document
> what the project includes at the starting point**, you can use a longer commit message:
>
> ```shell
> git commit -m "feat: initial commit 🎉" -m "Initial project setup with:
> - Express app in TypeScript
> "
> ```
>
> This can help clarify the initial scope of the project and makes the first commit more informative.

### ⓷. 🔄 Update Dependency Versions

When starting a new project, it’s generally best to work with the **latest compatible versions** of dependencies.
However, because this repository is a **template**, dependency versions may not always be updated immediately and can
lag behind current releases.

For a new project, you should **review and update dependencies** to ensure you are starting with up-to-date packages.

**① Update Dependencies**

You can update dependencies using one of the following commands:

```shell
# Update all dependencies within the version ranges defined in `package.json`
pnpm up

# Force update to the latest available version
pnpm up --latest
```

> ### 🧐 Caution
>
> Using `--latest` may introduce breaking changes or incompatibilities with the existing code. Always test carefully
> after running this command.

**② Verify and Commit the Updated Versions**

After updating dependencies, verify the project in the same way as after cloning (_follow the [Getting Started](../README.md#-getting-started-)
in README.md_).

If everything works as expected, you can include the dependency updates in your initial commit:

```shell
git add .
git commit --amend
```

> ### 🧠 _Why Use `git commit --amend`?_
>
> Updating dependency versions does not introduce new features or behavior to the project. To keep the Git history
> clean, these updates can be **merged into the initial commit** instead of creating a separate one.
>
> The `--amend` flag **updates the most recent commit** by including the new changes, instead of creating a new commit.
>
>> ### ⚠️ Warning
>> `git commit --amend` should only be used **when the commit has not been pushed to a remote repository**. If the
>> initial commit has already been pushed, create a new commit instead:
>>
>> ```bash
>> git add .
>> git commit -m "chore: update dependencies"
>> ```

##### 🚧 <u>If Issues Occur</u>

If updating dependencies causes errors or unexpected behavior, follow these steps to recover and proceed safely.

**① Revert All Changes**

Reset the working directory to a clean state:

```shell
# Revert all tracked file changes
git checkout .

# Remove all untracked files and directories
git clean -df
```

**② Update Dependencies Incrementally**

Instead of updating all packages at once, update them **one at a time** or **in small groups**. This makes it easier to
identify which package introduces incompatibilities.

```shell
pnpm up <package> [<another-package> ...]
```

> ### 💡 _Validate Compatibility_
>
> The project should use **only dependency versions that are compatible with the current codebase**. For each dependency
> update:
>   - Verify the project still runs correctly
>   - Keep the update if it introduces no regressions
>   - If issues occur, identify the dependency causing the problem
>     + Review the package’s **documentation**, **changelog**, or **migration guide**
>     + Apply required configuration or code changes where applicable
>   - 🚧 If the issue cannot be resolved safely, revert the change and **skip that dependency update**


### ⓸. 🧹 Clean Up Template Artifacts

After cloning and initializing the project, some **defaults and examples are included** as starting points. The
checklist below highlights the common areas to **review and clean up** so the project reflects your own application.

##### ✅ <u>Update Project Manifest ([`package.json`](../package.json))</u>

1. Update the `name` to your project name
2. Set the `version` to the appropriate starting version (e.g. `1.0.0`)
3. Review and update ownership and distribution fields: `license`, `author`
4. If your project is private, add `"private": true`

##### ✅ <u>Review and Update [`README.md`](../README.md)</u>

1. Change the [_title_](../README.md#km-express-template) from `KM Express Template` to your project name\
   Update the _description_ to explain what your project does\
   Remove the _How to Use This Template_ link
2. If you completed step [_3. Update Dependency Versions_](#3--update-dependency-versions), update the versions listed
   in the [_Specifications_](../README.md#-prerequisites) (_using [`package.json`](../package.json) as the source of truth_)
3. In _Getting Started_ -> [_Installation_](../README.md#-installation), replace:
   + The example Git repository URL (`https://github.com/joephankm/km-express-template.git`)
   + Any placeholder project names with your actual project repository and name
4. Review the overall structure of `README.md`. If you prefer a simpler document, **remove sections that are not
   relevant to your project**. At minimum, it is recommended to keep:
   + [_Getting Started_](../README.md#-getting-started-)
   + [_Scripts_](../README.md#-scripts-)

##### ✅ <u>Remove Irrelevant Documentation</u>

- The following files are specific to template usage and evolution and should not be kept:
  + [`docs/versions.md`](../docs/versions.md) — Project and template version tracking notes
  + `docs/how-to-run.md` — Setup and onboarding guide\
    (_This file should be deleted **after setup is complete**_)

After completing the cleanup, include these changes in the initial commit:

```shell
git add .
git commit --amend
```


### ⓹. 🏁 Push to Git Repository

Once all initial setup steps are complete, you can push the project to a remote Git repository. If you have already
created an **empty repository**, **follow the provider’s setup guide**. While the exact wording may differ between
platforms, the steps are generally the same.

```shell
# Add the remote repository
git remote add origin <repository-url>

# Set the default branch name
git branch -M main

# Push the project to the remote repository
git push -u origin main
```
