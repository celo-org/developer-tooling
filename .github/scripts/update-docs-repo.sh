#!/bin/bash
set -x

# Create target directory if it doesn't exist
mkdir -p ./tooling/libraries-sdks/cli

# Remove existing files except index.md and readme files
find ./tooling/libraries-sdks/cli -type f \( -name "*.md" -o -name "*.mdx" \) ! -name "index.mdx" ! -name "*readme*" ! -name "*README*" -delete

# Copy files and rename .md to .mdx
for file in ./submodules/developer-tooling/docs/command-line-interface/*.md; do
  if [ -f "$file" ]; then
    basename=$(basename "$file" .md)
    cp "$file" "./tooling/libraries-sdks/cli/${basename}.mdx"
  fi
done

# Add frontmatter to each command doc file
for file in ./tooling/libraries-sdks/cli/*.mdx; do
  if [ -f "$file" ]; then
    basename=$(basename "$file" .mdx)
    # Skip index file and readme files
    if [[ "$basename" != "index" && "$basename" != *"readme"* && "$basename" != *"README"* ]]; then
      # Capitalize first letter of command name
      capitalized=$(echo "$basename" | sed 's/^./\U&/')
      
      # Create temporary file with frontmatter
      echo "---" > "$file.tmp"
      echo "title: celocli $basename" >> "$file.tmp"
      echo "sidebarTitle: \"$capitalized\"" >> "$file.tmp"
      echo "---" >> "$file.tmp"
      echo "" >> "$file.tmp"
      # Append original content
      cat "$file" >> "$file.tmp"
      # Replace original file
      mv "$file.tmp" "$file"
    fi
  fi
done

# Fix USAGE code blocks to have sh syntax highlighting
for file in ./tooling/libraries-sdks/cli/*.mdx; do
  if [ -f "$file" ]; then
    # Replace ``` followed by newline and USAGE with ```sh followed by newline and USAGE
    sed -i '/^```$/{N;s/^```\nUSAGE/```sh\nUSAGE/;}' "$file"
  fi
done

# Update docs.json to only include CLI pages that exist
echo "Current directory: $(pwd)"
echo "Looking for docs.json..."
ls -la docs.json || echo "docs.json not found"

if [ -f "docs.json" ]; then
  echo "Found docs.json, updating CLI pages..."
  
  # Create list of existing CLI files (without .mdx extension)
  echo "Scanning CLI files in ./tooling/libraries-sdks/cli/"
  ls -la ./tooling/libraries-sdks/cli/
  
  # Start with index if it exists
  cli_files=""
  if [ -f "./tooling/libraries-sdks/cli/index.mdx" ]; then
    cli_files="\"tooling/libraries-sdks/cli/index\""
    echo "Found CLI file: index (added first)"
  fi
  
  # Add all other files (excluding index since we already added it)
  for file in ./tooling/libraries-sdks/cli/*.mdx; do
    if [ -f "$file" ]; then
      basename=$(basename "$file" .mdx)
      if [ "$basename" != "index" ]; then
        echo "Found CLI file: $basename"
        if [ -n "$cli_files" ]; then
          cli_files="$cli_files,"
        fi
        cli_files="$cli_files\"tooling/libraries-sdks/cli/$basename\""
      fi
    fi
  done
  
  echo "CLI files list: [$cli_files]"
  
  # Use jq to update the CLI pages section in docs.json
  echo "Updating docs.json with jq..."
  jq --argjson pages "[$cli_files]" '
    (.navigation.tabs[] | select(.tab == "Tooling") | .groups[] | select(.group == "Libraries & SDKs") | .pages[2] | .pages) = $pages
  ' docs.json > docs.json.tmp && mv docs.json.tmp docs.json
  
  echo "docs.json updated successfully"
else
  echo "docs.json not found in current directory"
fi

# Add warning file about generated content (only if it doesn't exist)
if [ ! -f "./tooling/libraries-sdks/cli/README.txt" ]; then
  cat > ./tooling/libraries-sdks/cli/README.txt << 'EOF'
⚠️ Do Not Edit These Files Directly

The files in this directory (except for index.mdx) are automatically generated from the celo-org/developer-tooling repository.

To make changes to the CLI documentation:
1. Edit the source files in the developer-tooling repository
2. The changes will be automatically synced to this documentation site

Any manual edits made directly to these files will be overwritten during the next sync.
EOF
fi