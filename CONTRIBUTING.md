# Contributing

## Git Workflow

### 1. Start from the latest default branch
- Pull the latest `master` before starting work.
- Create a focused feature branch for each task.

Suggested branch naming:
- `feature/patient-table-view`
- `fix/search-filter-reset`
- `docs/git-workflow`
- `refactor/shared-component-types`

### 2. Keep branches focused
- One branch should solve one problem.
- Avoid mixing UI, API, and unrelated cleanup in the same branch unless they are part of the same feature.

### 3. Commit in meaningful increments
Use commits that capture a logical unit of work:
- one UI layout change
- one API enhancement
- one refactor
- one docs update

Good commit frequency:
- Commit after a meaningful working step.
- Avoid one huge end-of-day commit.
- Avoid many tiny commits like `wip`, `fix`, `again`, or `test`.

A good rule of thumb:
- 2–6 commits for a small feature
- 1–3 commits for a small bug fix
- 1 commit for a docs-only change

### 4. Write meaningful commit messages
Recommended format:
- `<type>: <short summary>`

Examples:
- `feat: add patient directory table view`
- `feat: support search, filter, and sorting in products API`
- `refactor: move shared component props into types folder`
- `fix: reset pagination when filters change`
- `docs: add contributing and pull request guidelines`

Common types:
- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`

Commit message tips:
- Use imperative mood
- Keep the first line concise
- Describe what changed, not the entire history of attempts

### 5. Validate before opening a PR
Before pushing, run the smallest relevant checks:
- `npm run lint`
- `npm run build`

### 6. Open a clean pull request
A pull request should:
- explain what changed
- explain why it changed
- mention how it was tested
- stay focused on one feature or fix

### 7. Review and merge
- Address review comments with follow-up commits.
- Squash only if it improves clarity.
- Keep final history readable.

## Recommended Workflow Example
1. Create branch: `feature/patient-directory-table`
2. Commit: `feat: add reusable search and filter controls`
3. Commit: `feat: implement patient table layout`
4. Commit: `fix: handle missing contact values in table rows`
5. Commit: `docs: document API params and git workflow`
6. Run lint/build
7. Open PR using the provided template

## What to avoid
- Committing generated noise unrelated to the task
- Mixing refactors with bug fixes without explanation
- Large unreviewable commits
- Commit messages like `update`, `changes`, `final`, `done`

