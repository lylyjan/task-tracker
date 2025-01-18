#!/usr/bin/env node
import { execSync } from 'child_process';
import process from 'node:process';

// Helper function to run git commands safely
const runGitCommand = (command) => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch (error) {
    throw new Error(`Git command failed: ${command}\n${error.message}`);
  }
};

// Helper function to check if a git remote exists
const remoteExists = (remoteName) => {
  try {
    execSync(`git remote get-url ${remoteName}`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
};

// Check if we're in a git repository
const isGitRepo = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
};

// Check if working directory is clean
const isWorkingDirectoryClean = () => {
  const status = runGitCommand('git status --porcelain');
  return status.length === 0;
};

// Update from upstream repository
const updateFromUpstream = (upstreamUrl) => {
  console.log('🔄 Checking for updates from upstream...');

  if (!isGitRepo()) {
    console.error('❌ Not a git repository');
    process.exit(1);
  }

  // Ensure we're on main branch
  const currentBranch = runGitCommand('git rev-parse --abbrev-ref HEAD');
  if (currentBranch !== 'main') {
    console.error('❌ Please switch to the main branch before updating');
    process.exit(1);
  }

  // Check if there are uncommitted changes
  if (!isWorkingDirectoryClean()) {
    console.error('❌ Please commit or stash your changes before updating');
    process.exit(1);
  }

  // Check for upstream remote and add if it doesn't exist
  if (!remoteExists('upstream')) {
    console.log('Adding upstream remote...');
    try {
      runGitCommand(`git remote add upstream ${upstreamUrl}`);
      console.log('✅ Added upstream remote successfully');
    } catch (error) {
      console.error('❌ Failed to add upstream remote:', error.message);
      process.exit(1);
    }
  }

  // Fetch and merge from upstream
  try {
    console.log('Fetching from upstream...');
    runGitCommand('git fetch upstream');

    // Create backup branch of current state
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupBranch = `backup-${timestamp}`;
    console.log(`Creating backup branch: ${backupBranch}`);
    runGitCommand(`git branch ${backupBranch}`);

    // Merge upstream changes
    console.log('Merging upstream changes...');
    runGitCommand('git merge upstream/main');
    console.log('✅ Successfully updated from upstream');
  } catch (error) {
    console.error('❌ Update failed:', error.message);
    console.log('Your current state is safely stored in the backup branch');
    console.log(
      'Please resolve any issues and then run the setup script again',
    );
    process.exit(1);
  }

  console.log(`\n✨ Update complete!`);
};

const upstreamUrl = process.argv[3];

updateFromUpstream(upstreamUrl);
