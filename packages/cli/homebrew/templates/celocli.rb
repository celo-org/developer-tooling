class Celocli < Formula
  desc "__CLI__DESC__"
  homepage "__CLI__HOMEPAGE__"
  url "__CLI_MAC_INTEL_DOWNLOAD_URL__"
  sha256 "__CLI_MAC_INTEL_SHA256__"
  version "__CLI_VERSION__"
  version_scheme 1

  on_macos do
    on_arm do
      url "__CLI_MAC_ARM_DOWNLOAD_URL__"
      sha256 "__CLI_MAC_ARM_SHA256__"
    end
  end

  on_linux do
    on_intel do
      url "__CLI_LINUX_DOWNLOAD_URL__"
      sha256 "__CLI_LINUX_SHA256__"
    end
    on_arm do
      url "__CLI_LINUX_ARM_DOWNLOAD_URL__"
      sha256 "__CLI_LINUX_ARM_SHA256__"
    end
  end

  def install
    inreplace "bin/celocli", /^CLIENT_HOME=/, "export CELOCLI_OCLIF_CLIENT_HOME=#{lib/"client"}\nCLIENT_HOME="
    libexec.install Dir["*"]
    bin.install_symlink libexec/"bin/celocli"

    # bash_completion.install libexec/"autocomplete-scripts/brew/bash" => "celocli"
    # zsh_completion.install libexec/"autocomplete-scripts/brew/zsh/_celocli"
  end

  # def caveats; <<~EOS
  #   To use the Celo CLI's autocomplete --
  #     Via homebrew's shell completion:
  #       1) Follow homebrew's install instructions https://docs.brew.sh/Shell-Completion
  #           NOTE: For zsh, as the instructions mention, be sure compinit is autoloaded
  #                 and called, either explicitly or via a framework like oh-my-zsh.
  #       2) Then run
  #         $ celocli autocomplete --refresh-cache
  #     OR
  #     Use our standalone setup:
  #       1) Run and follow the install steps:
  #         $ celocli autocomplete
  # EOS
  # end

  test do
    system bin/"celocli", "--version"
  end
end