
with import ../nixpkgs { };
let
  inky = python3.pkgs.buildPythonPackage {
    pname = "inky";
    version = "git";

    src = lib.cleanSource ./library;

    propagatedBuildInputs = with python3.pkgs; [
      numpy
      pillow
      rpi-gpio
      smbus2
      spidev
    ];

    # needs hardware
    doCheck = false;
  };
in
mkShell {
  buildInputs = [ inky ];
}
