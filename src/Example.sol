pragma solidity 0.6.5;

import "@nomiclabs/buidler/console.sol";
import "./Greeter.sol";

contract Example {
    function greet() public view returns (string memory) {
        return string(abi.encodePacked(_greeter.greet(), " ", uint2str(_v)));
    }

    function uint2str(uint256 _i)
        private
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }

        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
            _i /= 10;
        }

        return string(bstr);
    }

    function mint() external {
        _nextMintId++;
    }

    // ///////////////////////////// STORAGE ///////////////////////////////////

    Greeter internal _greeter;
    uint256 internal _v;
    uint256 internal _nextMintId;

    // ///////////////////////////// CONSTRUCTOR / UPGRADE //////////////////////////////
    modifier proxy() {
        address adminAddress;
        // solhint-disable-next-line security/no-inline-assembly
        assembly {
            adminAddress := sload(
                0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
            )
        }
        if (adminAddress == address(0)) {
            // ensure can not be called twice when used outside of proxy : no admin
            // solhint-disable-next-line security/no-inline-assembly
            assembly {
                sstore(
                    0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103,
                    0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                )
            }
        } else {
            require(msg.sender == adminAddress);
        }
        _;
    }

    function postUpgrade(Greeter greeter) public proxy {
        // guard to allow constructor like behavior
        if (_nextMintId == 0) {
            _nextMintId = 1; // allow to mintId to start at 1. the gaurd ensure it is never reset
        }
        _greeter = greeter;
        _v++;
        console.log("postUpgrade", _v);
    }

    // constructor(Greeter greeter) public {
    //     postUpgrade(greeter);
    // }
}
