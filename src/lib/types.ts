export interface TrendingResult {
  heading: string;
  description: string;
  tags: string[];
  img: string;
}

export interface FollowResult {
  userImg: string;
  username: string;
  tag: string;
}

export type Tweet = {
  id: string;
  username: string;
  tweetText: string;
  isDeleted: boolean;
  likeCount: number;
  isLiked: boolean;
  timestamp: number;
};

export interface Comment {
  id: string;
  tweetId: string;
  commenter: string;
  commentText: string;
  isDeleted: boolean;
  likeCount: number | any;
  isLiked: boolean;
  timestamp: Date | any;
}
