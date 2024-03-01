// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

contract twitter {

    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);
    event ToggleLike(uint tweetId, bool isLiked, uint likeCount);


    struct Tweet {
        uint id;
        address username;
        string tweetText;
        bool isDeleted;
        uint256 likeCount;
        bool isLiked;
        uint256 timestamp;
    }

    Tweet[] private tweets;

    // Mapping of Tweet id to the wallet address of the user
    mapping(uint256 => address) tweetToOwner;

    // Method to be called by our frontend when trying to add a new Tweet
    function addTweet(string memory tweetText, bool isDeleted, uint256 likeCount, bool isLiked) external {
        uint tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, tweetText, isDeleted, likeCount , isLiked, block.timestamp));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    // Method to get all the Tweets
    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
            result[i].isLiked = tweets[temporary[i].id].isLiked;
            result[i].likeCount = tweets[temporary[i].id].likeCount;
        }
        return result;
    }

    // Method to get only your Tweets
    function getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
            result[i].isLiked = tweets[temporary[i].id].isLiked;
            result[i].likeCount = tweets[temporary[i].id].likeCount;
        }
        return result;
    }

    // Method to Delete a Tweet
    function deleteTweet(uint tweetId, bool isDeleted) external {
        if(tweetToOwner[tweetId] == msg.sender) {
            tweets[tweetId].isDeleted = isDeleted;
            emit DeleteTweet(tweetId, isDeleted);
        }
    }

      function toggleLike(uint tweetId) external {
        Tweet storage tweet = tweets[tweetId];
        tweet.isLiked = !tweet.isLiked;
        if(tweet.isLiked) {
            tweet.likeCount++;
        } else {
            tweet.likeCount--;
        }
        emit ToggleLike(tweetId, tweet.isLiked, tweet.likeCount);
    }

}