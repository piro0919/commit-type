import * as vscode from "vscode";
import { GitExtension } from "./git";

export function activate(context: vscode.ExtensionContext) {
  const { commands, extensions, window, workspace } = vscode;
  const extension = extensions.getExtension<GitExtension>("vscode.git");

  if (!extension) {
    return;
  }

  const { exports } = extension;
  const { repositories } = exports.getAPI(1);
  const types = [
    {
      description: "A bug fix",
      emoji: "🐞",
      value: "fix",
    },
    {
      description: "A new feature",
      emoji: "⭐",
      value: "feat",
    },
    {
      description:
        "Changes that affect the build system or external dependencies",
      emoji: "👷",
      value: "build",
    },
    {
      description: "Maintain",
      emoji: "⚙️",
      value: "chore",
    },
    {
      description: "Changes to our CI configuration files and scripts",
      emoji: "🚀",
      value: "ci",
    },
    {
      description: "Documentation only changes",
      emoji: "📝",
      value: "docs",
    },
    {
      description: "Changes that do not affect the meaning of the code",
      emoji: "💅",
      value: "style",
    },
    {
      description: "A code change that neither fixes a bug nor adds a feature",
      emoji: "🔨",
      value: "refactor",
    },
    {
      description: "The commit reverts a previous commit",
      emoji: "🦔",
      value: "revert",
    },
    {
      description: "A code change that improves performance",
      emoji: "⚡️",
      value: "perf",
    },
    {
      description: "Adding missing tests or correcting existing tests",
      emoji: "✅",
      value: "test",
    },
  ];

  const disposable = commands.registerCommand(
    "commit-type.addCommitType",
    async () => {
      if (!repositories.length) {
        return;
      }

      const repository = repositories[0];
      const workspaceConfiguration = workspace.getConfiguration("commitType");
      const displayDescription =
        workspaceConfiguration.get<boolean>("displayDescription");
      const displayEmoji = workspaceConfiguration.get<boolean>("displayEmoji");
      const items = types.map(
        ({ description, emoji, value }) =>
          `${value}${displayEmoji ? emoji : ""}: ${
            displayDescription ? description : ""
          }`
      );
      const result = await window.showQuickPick(items);

      if (!result) {
        return;
      }

      const index = items.findIndex((item) => result === item);

      if (index < 0) {
        return;
      }

      const { emoji, value } = types[index];

      repository.inputBox.value = `${value}${displayEmoji ? emoji : ""}: `;
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
