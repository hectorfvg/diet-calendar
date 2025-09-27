#!/bin/bash

# Firebase deployment script that keeps Git and Firebase synchronized
# Usage: ./deploy-firebase.sh "commit message"

set -e  # Exit on any error

# Check if commit message is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./deploy-firebase.sh \"Your commit message\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🚀 Starting synchronized Firebase deployment..."

# Step 1: Build the project
echo "📦 Building React application..."
npm run build

# Step 2: Deploy to Firebase
echo "🔥 Deploying to Firebase..."
firebase deploy

# Step 3: Commit and push changes to Git
echo "📝 Committing changes to Git..."
git add .

# Create commit with provided message and Claude attribution
git commit -m "$(cat <<EOF
$COMMIT_MSG

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

echo "⬆️ Pushing to remote repository..."
git push

echo "✅ Deployment complete!"
echo "🔗 Firebase: https://diet-calendar-609d1.web.app"
echo "📂 GitHub: https://github.com/hectorfvg/diet-calendar"
echo ""
echo "Both Firebase and Git are now synchronized! 🎉"