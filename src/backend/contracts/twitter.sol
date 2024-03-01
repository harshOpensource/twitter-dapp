// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

contract twitter {

    event AddTweet(address recipient, string tweetId);
    event DeleteTweet(string tweetId, bool isDeleted);
    event ToggleLike(string tweetId, bool isLiked, uint likeCount);
    event AddComment(string tweetId, address commenter, string commentId);
    event DeleteComment(string tweetId, string commentId, bool isDeleted);
    event ToggleCommentLike(string tweetId, string commentId, bool isLiked, uint likeCount);


    struct Comment {
        string id;
        string tweetId;
        address commenter;
        string commentText;
        bool isDeleted;
        uint256 likeCount;
        bool isLiked;
        uint256 timestamp;

    }

    struct Tweet {
        string id;
        address username;
        string tweetText;
        bool isDeleted;
        uint256 likeCount;
        bool isLiked;
        uint256 timestamp;
    }

    Tweet[] private tweets;
    Comment[] private comments;

    mapping(string => address) private tweetToOwner;
    mapping(string => mapping(string => uint)) private commentToIndex; 


    // Method to be called by our frontend when trying to add a new Tweet
    function addTweet(string memory id, string memory tweetText, bool isDeleted, uint256 likeCount, bool isLiked) external {    
    tweets.push(Tweet({
        id: id,
        username: msg.sender,
        tweetText: tweetText,
        isDeleted: isDeleted,
        likeCount: likeCount,
        isLiked: isLiked,
        timestamp: block.timestamp
    }));
    tweetToOwner[id] = msg.sender;
    emit AddTweet(msg.sender, id);
}

    // Method to get all the Tweets
    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory result = new Tweet[](tweets.length);
        uint counter = 0;
        for (uint i = 0; i < tweets.length; i++) {
            if (!tweets[i].isDeleted) {
                result[counter] = tweets[i];
                counter++;
            }
        }
        // Resize the result array to remove any empty elements
        assembly {
            mstore(result, counter)
        }
        return result;
    }


    // Method to get only your Tweets
   function getMyTweets() external view returns (Tweet[] memory) {
    uint counter = 0;
    // Create an array to store temporary tweets
    Tweet[] memory temporary = new Tweet[](tweets.length);
    // Iterate through all tweets
    for(uint i = 0; i < tweets.length; i++) {
        // Check if the tweet belongs to the caller and is not deleted
        if(tweetToOwner[tweets[i].id] == msg.sender && tweets[i].isDeleted == false) {
            // Add the tweet to temporary array
            temporary[counter] = tweets[i];
            counter++;
        }
    }

    // Create an array to store result tweets
    Tweet[] memory result = new Tweet[](counter);
    // Copy tweets from temporary array to result array
    for(uint i = 0; i < counter; i++) {
        result[i] = temporary[i];
    }
    return result;
}

    // Method to Delete a Tweet
    function deleteTweet(string memory tweetId, bool isDeleted) external {
    // Ensure that the caller is the owner of the tweet
        require(tweetToOwner[tweetId] == msg.sender, "You are not the owner of this tweet");

        // Find the index of the tweet with the given ID
        uint indexToDelete = findTweetIndex(tweetId);
        // Ensure that the tweet exists
        require(indexToDelete < tweets.length, "Tweet does not exist");

        // Set the isDeleted flag for the tweet
        tweets[indexToDelete].isDeleted = isDeleted;
        emit DeleteTweet(tweetId, isDeleted);
}

    // Helper function to find the index of a tweet in the tweets array
    // Helper function to find the index of a tweet in the tweets array
    function findTweetIndex(string memory tweetId) internal view returns (uint) {
        for (uint i = 0; i < tweets.length; i++) {
            if (keccak256(bytes(tweets[i].id)) == keccak256(bytes(tweetId))) {
                return i;
            }
        }
        return type(uint).max; // Return maximum value for uint to indicate tweet not found
    }


      // Method to toggle like on a tweet
    function toggleLike(string memory tweetId) external {
        // Find the index of the tweet with the given ID
        uint indexToToggle = findTweetIndex(tweetId);
        // Ensure that the tweet exists
        require(indexToToggle < tweets.length, "Tweet does not exist");

        // Toggle the isLiked flag for the tweet
        Tweet storage tweet = tweets[indexToToggle];
        tweet.isLiked = !tweet.isLiked;
        if(tweet.isLiked) {
            tweet.likeCount++;
        } else {
            tweet.likeCount--;
        }
        emit ToggleLike(tweetId, tweet.isLiked, tweet.likeCount);
    }



        function addComment(
        string memory tweetId,
        string memory commentId,
        string memory commentText
    ) external {
        uint index = findTweetIndex(tweetId);
        require(index < tweets.length, "Tweet does not exist");

        comments.push(Comment({
            id: commentId,
            tweetId: tweetId,
            commenter: msg.sender,
            commentText: commentText,
            isDeleted: false,
            likeCount: 0,
            isLiked: false,
            timestamp: block.timestamp

        }));

        uint commentIndex = comments.length - 1; // Get the index of the newly added comment
        commentToIndex[tweetId][commentId] = commentIndex; // Associate the comment with the tweet

        emit AddComment(tweetId, msg.sender, commentId);
    }

    function deleteComment(string memory tweetId, string memory commentId, bool isDeleted) external {
    uint commentIndex = commentToIndex[tweetId][commentId];
    require(commentIndex < comments.length, "Comment does not exist");

    comments[commentIndex].isDeleted = isDeleted;
    emit DeleteComment(tweetId, commentId, isDeleted);
}

    function toggleCommentLike(string memory tweetId, string memory commentId) external {
        uint commentIndex = commentToIndex[tweetId][commentId];
        require(commentIndex < comments.length, "Comment does not exist");

        Comment storage comment = comments[commentIndex];
        comment.isLiked = !comment.isLiked;
        if (comment.isLiked) {
            comment.likeCount++;
        } else {
            comment.likeCount--;
        }
        emit ToggleCommentLike(tweetId, commentId, comment.isLiked, comment.likeCount);
    }

     function getCommentsByTweetId(string memory tweetId) external view returns (Comment[] memory) {
            uint numComments = comments.length;
            uint counter = 0;
            
            // Iterate through all comments
            for (uint i = 0; i < numComments; i++) {
                // Check if the comment's associated tweet ID matches the input tweet ID
                if (keccak256(bytes(comments[i].tweetId)) == keccak256(bytes(tweetId))) {
                    counter++;
                }
            }
            
            // Create an array to store the comments associated with the tweet
            Comment[] memory tweetComments = new Comment[](counter);
            counter = 0; // Reset counter to use it as an index for the tweetComments array
            
            // Populate the tweetComments array with comments associated with the tweet ID
            for (uint i = 0; i < numComments; i++) {
                if (keccak256(bytes(comments[i].tweetId)) == keccak256(bytes(tweetId))) {
                    tweetComments[counter] = comments[i];
                    counter++;
                }
            }
            
            return tweetComments;
        }

   
   function getTweet(string memory tweetId) external view returns (Tweet memory, Comment[] memory) {
    uint tweetIndex = findTweetIndex(tweetId);
    require(tweetIndex < tweets.length, "Tweet does not exist");

    Tweet memory tweet = tweets[tweetIndex];
    uint numComments = comments.length;
    Comment[] memory tweetComments = new Comment[](numComments);
    uint counter = 0;

    for (uint i = 0; i < numComments; i++) {
        if (keccak256(bytes(comments[i].id)) == keccak256(bytes(tweetId))) {
            tweetComments[counter] = comments[i];
            counter++;
        }
    }

    // Resize the array to remove any empty elements
    assembly {
        mstore(tweetComments, counter)
    }

    return (tweet, tweetComments);
}

}