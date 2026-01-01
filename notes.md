# Learning Outcome



# removing file from git staging 

- git reset HEAD -- <filename>
- git rm -r --cached <filename>
- OR in this case git rm -r --cached client

- git restore --staged <file>

# more giit commands

- git pull --rebase origin main
This command:
* This fetches remote changes
* Re-applies your local commits on top of them

- Error message:

```hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.```