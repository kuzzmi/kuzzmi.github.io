with (import (fetchTarball https://github.com/nixos/nixpkgs/archive/c0bd23b130d32b101d74d22e1a659f2de1ca7caf.tar.gz) {});

mkShell {
  buildInputs = with pkgs; [
    nodejs-14_x
    nodePackages.yarn
  ];
  shellHook = ''
    export NODE_PATH=$PWD/.nix-node
    export NPM_CONFIG_PREFIX=$NODE_PATH
    export YARN_CONFIG_PREFIX=$NODE_PATH
    export PATH=$NODE_PATH/bin:$PATH

    mkdir -p $NODE_PATH

    ls $NODE_PATH
  '';
}
