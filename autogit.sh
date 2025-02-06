#!/bin/bash

check_commit_message() {
    if [ -z "$1" ]; then
        echo "Error: Commit message cannot be empty."
        exit 1
    fi
}

echo "Adding all changes to the staging area..."
git add .

read -p "Enter your commit message: " commit_message
check_commit_message "$commit_message"

echo "Committing changes with message: '$commit_message'..."
git commit -m "$commit_message"

echo "Pushing changes to the remote repository..."
git push

echo "Done! Changes have been added, committed, and pushed."