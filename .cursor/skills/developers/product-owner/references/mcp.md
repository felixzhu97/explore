# Atlassian MCP Integration

This project uses `plugin-atlassian-atlassian` MCP Server for Jira operations.

## Configuration

| Property | Value |
|----------|-------|
| Site URL | https://felixzhu.atlassian.net |
| Cloud ID | `75684fb5-daf5-4962-9581-c4948b9c12cf` |
| User Account ID | `62ee247ff15eecaf500efa39` |
| Primary Project | Repo-specific — see below |

### Primary project by repository

| Repository | Project Key | Name |
|------------|-------------|------|
| explore-ai | `AI` | ExploreAI |
| explore-iam | `EXP` | Explore |

### Available Projects

| Project Key | Name | Issue Types |
|-------------|------|-------------|
| `AI` | ExploreAI | Epic, Story, Task, Subtask, Bug, Feature |
| `EXP` | Explore | 长篇故事, 故事, 任务, Subtask, 功能, 缺陷 |
| `FVXI` | 支持 | Service Request, Incident, Task, Subtask |
| `GROW` | Grow | 长篇故事, 任务, 子任务 |

> Always include `cloudId` when calling Jira MCP tools.

## Available Tools

| Tool | Purpose |
|------|---------|
| `getVisibleJiraProjects` | List projects visible to the current user |
| `getJiraIssue` | Get issue details by key |
| `createJiraIssue` | Create a new issue |
| `editJiraIssue` | Edit an existing issue |
| `addCommentToJiraIssue` | Add a comment |
| `transitionJiraIssue` | Transition issue status |
| `searchJiraIssuesUsingJql` | Search issues using JQL |
| `getTransitionsForJiraIssue` | Get available status transitions |
| `lookupJiraAccountId` | Look up user account ID |

## Quick Reference

### Create Issue

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "createJiraIssue",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "projectKey": "AI",
    "issueTypeName": "任务",
    "summary": "任务标题",
    "description": "任务描述内容（支持 wiki markup）",
    "assignee_account_id": "62ee247ff15eecaf500efa39"
  }
}
```

### Search Issues

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "searchJiraIssuesUsingJql",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "jql": "project = AI ORDER BY created DESC",
    "maxResults": 20
  }
}
```

### Add Comment

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "addCommentToJiraIssue",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "issueIdOrKey": "AI-123",
    "comment": "Comment content"
  }
}
```

## Workflow

**Epic-first (required for Story / Task / Bug / Feature):**

1. Call `getAccessibleAtlassianResources` / use fixed `cloudId` as needed.
2. **Search Epics** for a matching theme:

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "searchJiraIssuesUsingJql",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "jql": "project = AI AND issuetype = 长篇故事 AND statusCategory != Done ORDER BY updated DESC",
    "maxResults": 20
  }
}
```

3. **If no matching Epic** — create one first (`issueTypeName`: `长篇故事`), business-facing summary (outcome theme, not tool names).
4. **Create the child** (Story `故事` / Task `任务` / Bug `缺陷` / Feature `功能`) and **link it under the Epic**.
5. Use `transitionJiraIssue` / `addCommentToJiraIssue` as needed.

### Create Epic

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "createJiraIssue",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "projectKey": "AI",
    "issueTypeName": "长篇故事",
    "summary": "Deliver reliable chat session resume for logged-in users",
    "description": "## Background\nUsers lose context after refresh.\n\n## Goal\nOwn stories that restore interrupted sessions safely."
  }
}
```

### Create child under Epic

Prefer `parent` with the Epic key when the project accepts it. If create fails or Epic Link is a custom field, set it via `additional_fields` (discover the field with `getJiraIssueTypeMetaWithFields` / project metadata).

```json
{
  "server": "plugin-atlassian-atlassian",
  "toolName": "createJiraIssue",
  "arguments": {
    "cloudId": "75684fb5-daf5-4962-9581-c4948b9c12cf",
    "projectKey": "AI",
    "issueTypeName": "故事",
    "summary": "As a logged-in user I want to resume my last chat so that I do not lose context",
    "description": "## Background\n…\n\n## User Story\n…",
    "parent": "AI-123",
    "additional_fields": {
      "customfield_10016": 3
    }
  }
}
```

> Never create a delivery Story/Task without an Epic affiliation. Subtasks still use `parent` for their Story/Task parent **and** the parent Story/Task must already sit under an Epic.

## MCP Tool Usage (Important)

**Required Parameters:**
- `cloudId` - Must be obtained from `getAccessibleAtlassianResources` tool first (or use fixed value: `75684fb5-daf5-4962-9581-c4948b9c12cf`)
- `issueTypeName` - **Must use localized name** (e.g. `任务` not `Task`)

**Common Issue Types:**
| English | API Value (Localized) |
|---------|----------------------|
| Epic | 长篇故事 |
| Story | 故事 |
| Task | 任务 |
| Subtask | Subtask |
| Bug | 缺陷 |
| Feature | 功能 |

> **Important**: Using English names like "Task" will result in error: `指定有效的事务类型`. Always use localized Chinese names.

**Workflow reminder:**
1. Call `getAccessibleAtlassianResources` to get `cloudId` (or use fixed value)
2. Search/create Epic (`长篇故事`) before Story/Task
3. Use `cloudId` for all subsequent Jira operations
4. Use localized `issueTypeName` when creating issues
5. For `projectKey`, use `AI` for ExploreAI project
6. Link child to Epic via `parent` and/or Epic Link in `additional_fields`