import { Octokit } from "octokit";

import { ServiceError } from "./errors.js";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createIssue(title, body, labels = []) {
  const issueInput = buildIssueInput({ title, body, labels });

  if (shouldUseMockIssue()) {
    return createMockIssue(issueInput);
  }

  try {
    return await requestIssueCreation(issueInput);
  } catch (error) {
    throw new ServiceError({
      message: "Connection error with the github or token invalid.",
      cause: error,
    });
  }
}

function buildIssueInput({ title, body, labels }) {
  if (process.env.VERCEL_ENV !== "preview") {
    return { title, body, labels };
  }

  return {
    title: `[preview] ${title}`,
    body: "This issue was created for testing purpose. Just ignore it and delete it after testing.\n\n" + body,
    labels,
  };
}

function shouldUseMockIssue() {
  return ["test", "development"].includes(process.env.NODE_ENV);
}

function createMockIssue({ title, body, labels }) {
  return {
    id: 123,
    number: 123,
    title,
    body,
    labels,
    state: "open",
    url: "https://api.github.com/repos/owner/repo/issues/123",
  };
}

async function requestIssueCreation({ title, body, labels }) {
  const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO_NAME,
    assignee: process.env.GITHUB_REPO_ASSIGNEE,
    title,
    body,
    labels,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return mapGithubIssue(response.data);
}

function mapGithubIssue(issue) {
  return {
    id: issue.id,
    number: issue.number,
    title: issue.title,
    body: issue.body,
    labels: issue.labels.map((label) => label.name),
    state: issue.state,
    url: issue.url,
  };
}

const github = {
  createIssue,
};

export default github;
