import { Post, Subchamber, Vote, User, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  subchamber: Subchamber;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
