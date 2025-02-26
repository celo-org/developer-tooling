class CeloCli < Formula
  desc "CLI Tool for transacting with the Celo protocol"
  homepage "https://docs.celo.org/cli"
  url "https://github.com/celo-org/developer-tooling/releases/download/%40celo%2Fcelocli%406.1.0/celocli-v6.1.0-c7514dd94-darwin-x64.tar.xz"
  sha256 "3e6c0f8624746f51afe3c6a84599cbe9eb0e67789f85d41d3ea1e063506610fc"
  version "6.1.0"
  version_scheme 1

  on_macos do
    on_arm do
      url "https://github.com/celo-org/developer-tooling/releases/download/%40celo%2Fcelocli%406.1.0/celocli-v6.1.0-c7514dd94-darwin-arm64.tar.xz"
      sha256 "a7f4e59afd65e2fbfd7853c9e77ff92a93b6aba873c42db770c341cbbf3a2b55"
    end
  end

  on_linux do
    on_intel do
      url "https://github.com/celo-org/developer-tooling/releases/download/%40celo%2Fcelocli%406.1.0/celocli-v6.1.0-c7514dd94-linux-x64.tar.xz"
      sha256 "58e947c84d7f1095f95dcebfbea2654d90570e9a5ea414ba1079d206d8838a39"
    end
    on_arm do
      url "https://github.com/celo-org/developer-tooling/releases/download/%40celo%2Fcelocli%406.1.0/celocli-v6.1.0-c7514dd94-linux-arm.tar.xz"
      sha256 "5c6cdf425392751d39909f446f93f23925ed18283c8b4276f69006542e094081"
    end
  end

  def install
    inreplace "bin/celocli", /^CLIENT_HOME=/, "export CELOCLI_OCLIF_CLIENT_HOME=#{lib/"client"}\nCLIENT_HOME="
    libexec.install Dir["*"]
    bin.install_symlink libexec/"bin/celocli"

    bash_completion.install libexec/"autocomplete-scripts/brew/bash" => "celocli"
    zsh_completion.install libexec/"autocomplete-scripts/brew/zsh/_celocli"
  end

  def caveats; <<~EOS
    To use the Celo CLI's autocomplete --
      Via homebrew's shell completion:
        1) Follow homebrew's install instructions https://docs.brew.sh/Shell-Completion
            NOTE: For zsh, as the instructions mention, be sure compinit is autoloaded
                  and called, either explicitly or via a framework like oh-my-zsh.
        2) Then run
          $ celocli autocomplete --refresh-cache
      OR
      Use our standalone setup:
        1) Run and follow the install steps:
          $ celocli autocomplete
  EOS
  end

  test do
    system bin/"celocli", "version"
  end
end