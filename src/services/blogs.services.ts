import { getDocs, updateDoc } from "firebase/firestore";
import { api } from "./api";
import { BlogType } from "./types";

// get blogs create class for blogs and methods for blogs
export class Blogs {
  // get all blogs
  static async getBlogs(): Promise<BlogType[]> {
    const result = await getDocs(api.blogsRef);
    return result.docs.map((doc) => {
      return {
        id: doc.id,
        docId: doc.id,
        blogger: doc.data().blogger,
        bloggerId: doc.data().bloggerId,
        bloggerImage: doc.data().bloggerImage,
        coverImage: doc.data().coverImage,
        createdAt: doc.data().createdAt,
        deleted: doc.data().deleted,
        description: doc.data().description,
        numComments: doc.data().numComments,
        numLikes: doc.data().numLikes,
        numViews: doc.data().numViews,
        readTime: doc.data().readTime,
        status: doc.data().status,
        title: doc.data().title,
        likes: doc.data().likes,
        mainBlog: doc.data().mainBlog,
        comments: doc.data().comments,
      };
    });
  }

  // get blog by id
  static async getBlogById(id: string): Promise<BlogType> {
    const result = this.getBlogs();
    return result.then((res) => {
      const blog = res.filter((blog) => blog.id === id)[0];
      return blog;
    });
  }

  // get blog by bloggerID
  static async getBlogByBloggerId(bloggerId: string): Promise<BlogType[]> {
    const result = this.getBlogs();
    return result.then((res) => {
      const blog = res.filter((blog) => blog.bloggerId === bloggerId);
      return blog;
    });
  }

  static async likeBlog(userId: string, blogId: string): Promise<void> {
    const blog = await this.getBlogById(blogId);
    const likes = blog.likes;

    if (likes?.includes(userId)) {
      likes.splice(likes.indexOf(userId), 1);
    } else {
      likes?.push(userId);
    }

    await updateDoc(api.blogByIdRef(blogId), { likes });
  }
}

export const getBlogs = Blogs.getBlogs;
export const getBlogById = Blogs.getBlogById;
export const getBlogByBloggerId = Blogs.getBlogByBloggerId;
export const likeBlog = Blogs.likeBlog;
