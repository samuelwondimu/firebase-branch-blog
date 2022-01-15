import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "./api";
import { BlogType, CommentType, NotificationType, UserType } from "./types";

// get all users
export async function getUsers(): Promise<UserType[]> {
  const result = await getDocs(api.usersRef);
  return result.docs.map((doc) => ({
    id: doc.data().user,
    avatar: doc.data().avatar,
    email: doc.data().email,
    name: doc.data().name,
    role: doc.data().role,
    status: doc.data().status,
    user: doc.data().user,
    createdAt: doc.data().createdAt,
  }));
}

// get adimn  users
export async function getAdminUsers(): Promise<UserType[]> {
  const result = await getDocs(api.adminUsersRef);
  return result.docs.map((doc) => ({
    // docId: doc.id,
    avatar: doc.data().avatar,
    email: doc.data().email,
    name: doc.data().name,
    role: doc.data().role,
    status: doc.data().status,
    user: doc.data().user,
    createdAt: doc.data().createdAt,
  }));
}

// get all annoynomus users
export async function getAnnoynomusUsers() {
  const result = await getDocs(api.annoynomusUsersRef);
  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
}

// get a user by ID
export async function getUserByUserId(userId: string | undefined) {
  const result = await getDoc(api.userByIdRef(userId));
  if (result.exists()) {
    const user = {
      avatar: result.data().photoURL,
      email: result.data().email,
      name: result.data().displayName,
      role: result.data().role,
      status: result.data().status,
      user: result.data().uid,
      createdAt: result.data().createdAt,
    };
    return user;
  } else {
    return undefined;
  }
}

// get ALL Blogs
export async function getBlogs(): Promise<BlogType[] | undefined> {
  const result = await getDocs(api.blogsRef);

  const blogs: BlogType[] | undefined = [];

  result.docs.map(async (data) => {
    const blog: BlogType = {
      id: data.id,
      title: data?.data().title,
      coverImage: data?.data().coverImage,
      blogger: data?.data().blogger,
      bloggerId: data?.data().bloggerId,
      bloggerImage: data?.data().bloggerImage,
      deleted: data?.data().deleted,
      description: data?.data().description,
      numComments: data?.data().numComments,
      numLikes: data?.data().numLikes,
      numViews: data?.data().numViews,
      readTime: data?.data().readTime,
      likes: data?.data().likes,
      mainBlog: data?.data().mainBlog,
      status: data?.data().status,
      createdAt: data?.data().createdAt,
    };
    blogs.push(blog);
  });

  return blogs;
}

// get Blog BY ID
export async function getBlogById(
  blogId: string | undefined
): Promise<BlogType | undefined> {
  const result = await getDoc(api.blogByIdRef(blogId));

  if (result.exists()) {
    return {
      id: result.id,
      title: result?.data().title,
      coverImage: result?.data().coverImage,
      blogger: result?.data().blogger,
      bloggerId: result?.data().bloggerId,
      bloggerImage: result?.data().bloggerImage,
      deleted: result?.data().deleted,
      description: result?.data().description,
      numComments: result?.data().numComments,
      numLikes: result?.data().numLikes,
      numViews: result?.data().numViews,
      readTime: result?.data().readTime,
      likes: result?.data().likes,
      mainBlog: result?.data().mainBlog,
      status: result?.data().status,
      createdAt: result?.data().createdAt,
    };
  } else {
    return undefined;
  }
}

// increment number of views
export async function incrementNumberOfViews(
  blogId: string | undefined,
  userId: string | undefined
) {
  return await updateDoc(api.blogByIdRef(blogId), {
    numViews: increment(1),
  }).then(() => {
    addDoc(api.viewsRef, {
      blogId,
      userId,
      createdAt: new Date().toISOString(),
    });
  });
}

export async function getViews() {
  const result = await getDocs(api.viewsRef);
  return result.docs.map((doc) => doc.data());
}

// LIKE A BLOG
export async function likeBlog(
  userId: string | undefined,
  blogId: string | undefined
) {
  return await updateDoc(api.blogByIdRef(blogId), {
    likes: arrayUnion(userId),
    numLikes: increment(1),
  });
}

// UNLIKE A BLOG
export async function unlikeBlog(
  userId: string | undefined,
  blogId: string | undefined
) {
  return await updateDoc(api.blogByIdRef(blogId), {
    likes: arrayRemove(userId),
    numLikes: increment(-1),
  });
}

// Add a comment
export async function addComment(
  blogId: string | undefined,
  userId: string,
  userName: string | null,
  commentText: string,
  avatar: string | null
) {
  return await addDoc(api.commentsRef, {
    blogId: blogId,
    commentText: commentText,
    userName: userName,
    avatar: avatar,
    userId: userId,
    reply: [],
    createdAt: new Date().toISOString(),
  }).then(() => {
    return updateDoc(api.blogByIdRef(blogId), {
      numComments: increment(1),
    });
  });
}

// add a reply
export async function addReply(
  userName: string | null,
  userId: string,
  commentId: string,
  avatar: string | null,
  replyText: string
) {
  return await updateDoc(api.commentsByCommentId(commentId), {
    reply: arrayUnion({
      userId: userId,
      userName: userName,
      avatar: avatar,
      reply: replyText,
      createdAt: new Date().toISOString(),
    }),
  });
}

// get all comments
export async function getComments(blogId: string): Promise<CommentType[]> {
  const result = await getDocs(api.commentsByBlogIdRef(blogId));

  const comments: CommentType[] = [];
  result.docs
    .sort((a, b) => {
      return a.data().createdAt - b.data().createdAt;
    })
    // eslint-disable-next-line array-callback-return
    .map((data) => {
      const comment: CommentType = {
        docId: data.id,
        commentText: data.data().commentText,
        blogId: data.data().blogId,
        avatar: data.data().avatar,
        userName: data.data().userName,
        userId: data.data().userId,
        reply: data.data().reply.map((thread: any) => ({
          avatar: thread.avatar,
          replyText: thread.reply,
          userId: thread.userId,
          userName: thread.userName,
          createdAt: thread.createdAt,
        })),
        createdAt: data.data().createdAt,
      };
      comments.push(comment);
    });
  return comments;
}

export async function getAllComments() {
  const result = await getDocs(api.commentsRef);
  return result.docs.map((doc) => doc.data());
}

// update number of views
export async function countNumberOfViews(blogId: string, userId: string) {
  return await addDoc(api.viewsRef, {
    blogId: blogId,
    createdAt: new Date().toISOString(),
  }).then(() => {
    updateDoc(api.blogByIdRef(blogId), {
      numViews: increment(1),
    });
  });
}

// create a notifications
export async function createNotification(
  type: string,
  senderId: string,
  receiverId: string | undefined,
  notificationMessage: string
) {
  return await addDoc(api.notificationRef, {
    id: doc(api.notificationRef).id,
    type: type,
    senderId: senderId,
    seen: false,
    receiverId: receiverId,
    notificationMessage: notificationMessage,
    createdAt: new Date().toISOString(),
  });
}

/**
 * update notification status to seen
 * @param notificationId
 */
export async function updateNotification(notificationId: string | undefined) {
  return await updateDoc(api.notificationByIdRef(notificationId), {
    seen: true,
  });
}

/**
 * getNotification
 * @param userId
 * @returns
 */
export async function getNotifications(
  receiverId: string | undefined
): Promise<NotificationType[] | undefined> {
  const result = await getDocs(api.notificationByReceiverIdRef(receiverId));

  const notifications: NotificationType[] = [];

  result.docs.map((data) => {
    const notification: NotificationType = {
      id: data.id,
      type: data.data().type,
      senderId: data.data().senderId,
      receiverId: data.data().receiverId,
      notificationMessage: data.data().notificationMessage,
      seen: data.data().seen,
      createdAt: data.data().createdAt,
    };
    return notifications.push(notification);
  });

  return notifications;
}

/**
 * suspend a user by setting the status to false
 * @param userId
 */
export async function suspendUser(userId: string) {
  return await updateDoc(api.userByIdRef(userId), {
    status: "suspended",
  });
}

export async function updateUser(userId: string, status: boolean) {
  return await updateDoc(api.userByIdRef(userId), {
    status: !status,
  });
}

/**
 * TODO: need fix
 * suspend a blog by setting the status to false
 * @param blogId
 */
export async function updateBlog(blogId: string, status: boolean) {
  return await updateDoc(api.blogByIdRef(blogId), {
    status: !status,
  });
}

export async function updateBlogDeleted(blogId: string, status: boolean) {
  return await updateDoc(api.blogByIdRef(blogId), {
    deleted: !status,
  });
}

/**
 * promote a user by setting the role to blogger
 * @param userId
 * @returns
 */
export async function promoteUser(userId: string, role: string) {
  return await updateDoc(api.userByIdRef(userId), {
    role: role,
  });
}

/**
 * get Blogs analytics
 * @returns {Promise<{totalBlogs: number, totalViews: number, totalLikes: number, totalComments: number, totalUsers: number}>}
 */
export async function getBlogsAnalytics(): Promise<{
  totalBlogs: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalUsers: number;
}> {
  let totalBlogs = 0;
  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalUsers = 0;

  const blogs = await getDocs(api.blogsRef);
  // eslint-disable-next-line array-callback-return
  blogs.docs.map((blog) => {
    totalBlogs += 1;
    totalViews += blog.data().numViews;
    totalLikes += +blog.data().likes.length;
    totalComments += blog.data().numComments;
  });

  const users = await getDocs(api.usersRef);
  // eslint-disable-next-line array-callback-return
  users.docs.map((user) => {
    totalUsers += 1;
  });
  return {
    totalBlogs: totalBlogs,
    totalViews: totalViews,
    totalLikes: totalLikes,
    totalComments: totalComments,
    totalUsers,
  };
}

// /**
//  * create a blog
//  * @param {string} coverImage
//  * @param {string} title
//  * @param {string} description
//  * @param {string} readTime
//  * @param {object} currentUser
//  * @param {Array} blocks
//  */
// export async function createBlog(coverImage: string, title: string, description: string, readTime: string, currentUser: User, blocks: any[]) {
//   // try catch and return error message if any
//   try {
//     const blog = await addDoc(api.blogsDescriptionRef, {
//       title: title,
//       coverImage: coverImage,
//       description: description,
//       readTime: readTime,
//       numLikes: 0,
//       numViews: 0,
//       blogger: currentUser.displayName,
//       bloggerId: currentUser.uid,
//       bloggerImage: currentUser.photoURL,
//       numComments: 0,
//       likes: [],
//       deleted: false,
//       status: false,
//       createdAt: new Date().toISOString(),
//     }).then((res) => {
//       addDoc(api.blogsMetaByIdCollRef(res.id), {
//         id: res.id,
//         blockData: blocks,
//         likes: [],
//         createdAt: new Date().toISOString(),
//       });
//     });
//     return blog;
//   } catch (error) {
//     return error;
//   } finally {
//     return null;
//   }
// }

/**
 * get blogs for bloggers by there user UID
 * @param bloggerId
 * @returns Promise<BlogType[]>
 */
export async function getBlogByBloggerId(
  bloggerId: string
): Promise<BlogType[]> {
  const blogs = await getDocs(api.blogDescriptionByBloggerIdRef(bloggerId));

  const blogsArr: BlogType[] = [];
  // eslint-disable-next-line array-callback-return
  blogs.docs.map((blog) => {
    const blogObj: BlogType = {
      title: blog.data().title,
      description: blog.data().description,
      coverImage: blog.data().coverImage,
      likes: blog.data().likes,
      comments: blog.data().comments,
      bloggerId: blog.data().bloggerId,
      blogger: blog.data().blogger,
      bloggerImage: blog.data().bloggerImage,
      createdAt: blog.data().createdAt,
      deleted: blog.data().deleted,
      numComments: blog.data().numComments,
      numLikes: blog.data().numLikes,
      numViews: blog.data().numViews,
      readTime: blog.data().readTime,
      status: blog.data().status,
    };
    blogsArr.push(blogObj);
  });
  return blogsArr;
}

// BLOGGER CREATE BLOG FUNCTIONS
export async function uploadImage(file: any) {
  const uploadTask = uploadBytesResumable(api.sotrageRef(file), file, {
    contentType: "image/jpeg",
  });
  uploadTask
    .on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        const errorMessage = error.message;
        return errorMessage;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        return url;
      }
    )
    .toString();

  const imageUrl = await uploadTask.snapshot;

  console.log(imageUrl.metadata.downloadTokens);

  return imageUrl.metadata;
}

export async function createBlog(blog: BlogType) {
  await addDoc(api.blogsRef, blog);
}
