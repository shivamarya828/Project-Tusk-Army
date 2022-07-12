// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

interface IToken  {
    function burn(address from, uint256 amount) external;

    function mint(address from, uint256 amount) external;

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    function transfer(address from, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);
}
