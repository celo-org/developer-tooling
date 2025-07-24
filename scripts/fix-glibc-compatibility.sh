#!/bin/bash

# Script to fix GLIBC compatibility issues with Foundry/Anvil
# This script provides multiple approaches to handle GLIBC version mismatches

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're on a system with GLIBC compatibility issues
check_glibc_issues() {
    log_info "Checking GLIBC version..."
    
    if command -v ldd >/dev/null 2>&1; then
        local glibc_version=$(ldd --version | head -n1 | grep -oE '[0-9]+\.[0-9]+' | head -n1)
        log_info "Current GLIBC version: $glibc_version"
        
        # Check if anvil exists and has GLIBC issues
        if command -v anvil >/dev/null 2>&1; then
            if ldd $(which anvil) 2>/dev/null | grep -q "GLIBC_[0-9]\+\.[0-9]\+"; then
                log_warn "Anvil binary has GLIBC version requirements"
                return 0
            fi
        fi
    fi
    
    return 1
}

# Method 1: Use patchelf to patch the binary (if available)
fix_with_patchelf() {
    log_info "Attempting to fix GLIBC issues with patchelf..."
    
    if ! command -v patchelf >/dev/null 2>&1; then
        log_warn "patchelf not found, attempting to install..."
        
        # Try to install patchelf
        if command -v apt-get >/dev/null 2>&1; then
            sudo apt-get update && sudo apt-get install -y patchelf
        elif command -v yum >/dev/null 2>&1; then
            sudo yum install -y patchelf
        elif command -v brew >/dev/null 2>&1; then
            brew install patchelf
        else
            log_error "Could not install patchelf automatically"
            return 1
        fi
    fi
    
    # Find anvil binary
    local anvil_path=$(which anvil 2>/dev/null || echo "")
    if [ -z "$anvil_path" ]; then
        log_error "Anvil binary not found"
        return 1
    fi
    
    log_info "Patching anvil binary at: $anvil_path"
    
    # Create backup
    cp "$anvil_path" "${anvil_path}.backup"
    
    # Patch the binary to use system GLIBC
    if patchelf --set-interpreter /lib64/ld-linux-x86-64.so.2 "$anvil_path" 2>/dev/null; then
        log_info "Successfully patched anvil binary"
        return 0
    else
        log_warn "Failed to patch with patchelf, restoring backup"
        mv "${anvil_path}.backup" "$anvil_path"
        return 1
    fi
}

# Method 2: Build Foundry from source
build_from_source() {
    log_info "Building Foundry from source..."
    
    # Install build dependencies
    if command -v apt-get >/dev/null 2>&1; then
        sudo apt-get update
        sudo apt-get install -y build-essential curl git pkg-config libssl-dev
    elif command -v yum >/dev/null 2>&1; then
        sudo yum groupinstall -y "Development Tools"
        sudo yum install -y curl git pkg-config openssl-devel
    else
        log_error "Unsupported package manager for building from source"
        return 1
    fi
    
    # Install Rust if not present
    if ! command -v cargo >/dev/null 2>&1; then
        log_info "Installing Rust..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        source ~/.cargo/env
    fi
    
    # Clone and build Foundry
    local temp_dir=$(mktemp -d)
    cd "$temp_dir"
    
    log_info "Cloning Foundry repository..."
    git clone https://github.com/foundry-rs/foundry.git
    cd foundry
    
    log_info "Building Foundry..."
    cargo build --release --bin anvil --bin cast --bin forge
    
    # Install the built binaries
    sudo cp target/release/anvil /usr/local/bin/
    sudo cp target/release/cast /usr/local/bin/
    sudo cp target/release/forge /usr/local/bin/
    
    log_info "Successfully built and installed Foundry from source"
    
    # Cleanup
    cd /
    rm -rf "$temp_dir"
    
    return 0
}

# Method 3: Use a different Foundry version that's compatible
try_different_version() {
    log_info "Trying different Foundry version..."
    
    # Try an older version that might be more compatible
    local old_version="v1.1.0"
    
    log_info "Installing Foundry version: $old_version"
    
    # Install specific version
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    
    # Try to install specific version
    if foundryup --version "$old_version" 2>/dev/null; then
        log_info "Successfully installed Foundry version $old_version"
        return 0
    else
        log_warn "Failed to install specific version, trying latest"
        foundryup
        return 1
    fi
}

# Method 4: Use Docker as fallback
use_docker_fallback() {
    log_info "Using Docker fallback for Foundry..."
    
    if ! command -v docker >/dev/null 2>&1; then
        log_error "Docker not available"
        return 1
    fi
    
    # Create a simple script to run commands in Docker
    cat > /tmp/run-with-foundry-docker.sh << 'EOF'
#!/bin/bash
docker run --rm \
  -v "$(pwd):/workspace" \
  -w /workspace \
  ubuntu:22.04 bash -c "
    apt-get update && apt-get install -y curl ca-certificates gnupg lsb-release
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    npm install -g yarn
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    foundryup
    $@
  "
EOF
    
    chmod +x /tmp/run-with-foundry-docker.sh
    log_info "Created Docker wrapper script at /tmp/run-with-foundry-docker.sh"
    log_info "Use it like: /tmp/run-with-foundry-docker.sh 'your command here'"
    
    return 0
}

# Main function
main() {
    log_info "Starting GLIBC compatibility fix..."
    
    # Check if we have GLIBC issues
    if ! check_glibc_issues; then
        log_info "No GLIBC compatibility issues detected"
        return 0
    fi
    
    log_warn "GLIBC compatibility issues detected"
    
    # Try different methods in order of preference
    local methods=(
        "fix_with_patchelf"
        "try_different_version"
        "build_from_source"
        "use_docker_fallback"
    )
    
    for method in "${methods[@]}"; do
        log_info "Trying method: $method"
        if $method; then
            log_info "Successfully resolved GLIBC issues using: $method"
            return 0
        else
            log_warn "Method $method failed, trying next..."
        fi
    done
    
    log_error "All methods failed to resolve GLIBC compatibility issues"
    return 1
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi 