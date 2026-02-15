---
description: Produce a spec + Acceptance Criteria for a task
subtask: true
---

Run the following three steps in order:

1. **Architect review**: Use the **architect** agent to review the design, coupling, boundaries, and maintainability implications for:
$ARGUMENTS

2. **Spec authoring**: Use the **spec** agent to produce a full spec + Acceptance Criteria for the same task, incorporating any architecture concerns or suggestions from step 1:
$ARGUMENTS

3. **Write specification file**: Write the combined output to a markdown file at `specs/<slug>.md` where `<slug>` is a kebab-case summary of the task (e.g. `specs/add-fee-currency-support.md`). Create the `specs/` directory if it does not exist.

The markdown file must have this structure:

```markdown
# <Task Title>

## Architecture Review

<architect agent's concerns, suggestions, and complexity hotspots>

## Specification

<spec agent's full specification>

## Acceptance Criteria

<numbered, testable AC items>

## Non-goals

<explicit non-goals>

## Open Questions

<any ambiguities or unresolved decisions>

---

AC_LOCKED: YES
```

After writing the file, print the file path so the user can review it.
