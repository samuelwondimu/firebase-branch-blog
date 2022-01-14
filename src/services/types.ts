export type BlogType = {
  id?: string | undefined;
  blogger: string | undefined;
  bloggerId: string | undefined;
  bloggerImage: string | undefined;
  coverImage: string | undefined;
  createdAt: any;
  deleted: boolean | undefined;
  description: string | undefined;
  numComments: number | undefined;
  numLikes: number | undefined;
  numViews: number | undefined;
  readTime: number | undefined;
  status: boolean | undefined;
  title: string | undefined;
  likes: string[] | undefined;
  mainBlog?: {
    docId: string | undefined;
    blockData: any[] | undefined;
    likes: any[] | undefined;
    createdAt: any;
  };
  comments?:
    | {
        docId: string | undefined;
        commentText: string | undefined;
        blogId: string | undefined;
        avatar: string | undefined;
        userName: string | undefined;
        userId: string | undefined;
        reply?:
          | {
              avatar: string | undefined;
              replyText: string | undefined;
              userId: string | undefined;
              createdAt: string | undefined;
              userName: string | undefined;
            }[]
          | undefined;
        createdAt: any;
      }[]
    | undefined;
};

export type CommentType = {
  docId: string | undefined;
  commentText: string | undefined;
  blogId: string | undefined;
  avatar: string | undefined;
  userName: string | undefined;
  userId: string | undefined;
  reply?:
    | {
        avatar: string | undefined;
        replyText: string | undefined;
        userId: string | undefined;
        createdAt: string | undefined;
        userName: string | undefined;
      }[]
    | undefined;
  createdAt: any;
};

export type BlogMetaType = {
  id: string;
  blockData: any[];
  likes: any[];
  createdAt: any;
};

export type UserType = {
  id?: string;
  avatar: string;
  email: string;
  name: string;
  role: string;
  status: boolean;
  user: string;
  createdAt: any;
};

export type NotificationType = {
  id: string;
  type: string;
  senderId: string;
  receiverId: string;
  notificationMessage: string;
  seen: boolean;
  createdAt: any;
};
