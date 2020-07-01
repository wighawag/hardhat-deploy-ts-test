pragma solidity 0.6.5;

import "@nomiclabs/buidler/console.sol";
import "./Greeter.sol";

contract AnotherExanple {
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

    // ///////////////////////////// STORAGE ///////////////////////////////////

    Greeter internal _greeter;
    uint256 internal _v;

    // ///////////////////////////// CONSTRUCTOR / UPGRADE //////////////////////////////
    bool private _constructed;
    modifier once() {
        if (!_constructed) {
            _;
        }
        _constructed = true;
    }

    modifier onlyAdmin() {
        address adminAddress;
        assembly {
            adminAddress := sload(
                0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
            )
        }
        require(msg.sender == adminAddress);
        _;
    }

    function construct(Greeter greeter) external once onlyAdmin {
        _greeter = greeter;
        console.log("constructor");
    }

    function postUpgrade() external onlyAdmin {
        _v++;
        console.log("postUpgrade", _v);
    }
}
