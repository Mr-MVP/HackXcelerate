// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract HACX_1 is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {

    constructor()
        ERC20("MEDIA_1", "M1")
        Ownable(msg.sender)
        ERC20Permit("MEDIA_1")
    {
        _mint(msg.sender, 500 * 10 ** decimals());
    }

    enum ACCOUNT_TYPE  {
        GENERAL,
        INFLUENCER,
        BRAND
    }

    struct ACCOUNT {
        string username;
        ACCOUNT_TYPE account_type;
        uint followerscount; 
        uint followingcount;
        string[] posts;
        // uint tokenbalance; 
        string[] content_type_liked;
    }


    struct POST {
        address creator;
 		uint likecount;
        bool blacklisted;
        uint comment_count;
 		string[] content_type;
 	}
 
    

    mapping (address => ACCOUNT) public accounts; 
    mapping(string => POST) public posts; // CID => POST
    mapping(string => mapping(address => bool)) public likedBy;
    mapping(string => mapping (address => string[])) public comments;
    mapping(address => mapping(address => bool)) public following;     // user => following other user

    
    
     //basics
    function createAccount(string memory _username) public returns (bool){
        if(bytes(accounts[msg.sender].username).length  == 0 ){
            accounts[msg.sender] = ACCOUNT(_username, ACCOUNT_TYPE.GENERAL, 0, 0, new string[](0), new string[](0));
            return true;
        } else {
            return false;
        }
    }
    
    function login() public view returns (ACCOUNT memory) {
            return accounts[msg.sender];
    }

    // automated, monetize 
    function createPost(string memory _CID, string[] calldata _type) public{
        accounts[msg.sender].posts.push(_CID);
        posts[_CID] = POST(msg.sender, 0, false,0, _type);
    }

    function createComment(string memory _comment, string memory _CID) public {
        posts[_CID].comment_count++;
        comments[_CID][msg.sender].push(_comment);
    }

    function blackListPost(string memory _CID) public {
        posts[_CID].blacklisted = !posts[_CID].blacklisted;
    }

    function toggleFollow(address _user) public returns (bool){
        if( !following[msg.sender][_user]){
            accounts[_user].followerscount++;
            accounts[msg.sender].followingcount++;
        } else {
            accounts[_user].followerscount--;
            accounts[msg.sender].followingcount--;
        }
        following[msg.sender][_user] = ! following[msg.sender][_user];
        return following[msg.sender][_user];
    }


//  reward(view/count) {fund token}

    function toggleLike(string memory _CID) public  returns(bool liked) {
        if(!likedBy[_CID][msg.sender]){
            posts[_CID].likecount++;
        } else { 
            posts[_CID].likecount--;
        }
        likedBy[_CID][msg.sender] = !likedBy[_CID][msg.sender];
        return likedBy[_CID][msg.sender];
    }
 
//  accountTypechange(address) // automated
 
 //community
//  donate(creator address, amt)

 
 //brand
//  issueMembers(erc721)
 
 //store
//  takeOwnerShip(CID) => sets new creator
 

    //getters
    function getAllPosts(address _creator) public  view returns(POST[] memory) {
        ACCOUNT memory acc = accounts[_creator];
        uint postCount = acc.posts.length;
        POST[] memory user_posts = new POST[](postCount);
        for(uint i = 0; i < postCount; i++){
            string memory cid = acc.posts[i];
            user_posts[i] = posts[cid];
        }
        return user_posts;
    }

    function getAllCIDS(address _creator) public view returns (string[] memory){
        return accounts[_creator].posts;
    }

    function getAccount(address _user) public view returns (ACCOUNT memory){
        return accounts[_user];
    }




    // openzeppelin
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
 
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

    // function transfer(address to, uint256 value) public override returns(bool) {
    //     super.transfer(to, value);
        
    // }


    //transfer(to, amt);
    //trasnferFrom(from, to, amt); dont use this

}