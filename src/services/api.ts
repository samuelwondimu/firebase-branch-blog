import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  FieldValue,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, fireStore, storage, auth, FieldValue };

export const api = {
  usersRef: collection(fireStore, "users"),

  userByIdRef: (userId: string | undefined) =>
    doc(fireStore, "users", `${userId}`),

  adminUsersRef: query(
    collection(fireStore, "users"),
    where("role", "==", "admin")
  ),

  annoynomusUsersRef: collection(fireStore, "annoymous"),

  viewsRef: collection(fireStore, "ViewsData"),

  blogsDescriptionRef: collection(fireStore, "blogsDescription"),

  blogDescriptionByIdRef: (blogId: string | undefined) =>
    doc(fireStore, "blogsDescription", `${blogId}`),

  blogDescriptionByBloggerIdRef: (bloggerId: string | undefined) =>
    query(
      collection(fireStore, "blogsDescription"),
      where("bloggerId", "==", `${bloggerId}`)
    ),

  blogsMetaRef: collection(fireStore, "blogsMeta"),

  blogMetaByIdRef: (blogId: string | undefined) =>
    doc(fireStore, "blogsMeta", `${blogId}`),

  blogsMetaByIdCollRef: (blogId: string | undefined) =>
    collection(fireStore, "blogsMeta", `${blogId}`),

  commentsRef: collection(fireStore, "comments"),

  commentsByCommentId: (commentId: string | undefined) =>
    doc(fireStore, `comments`, `${commentId}`),

  commentsByBlogIdRef: (blogId: string | undefined) =>
    query(
      collection(fireStore, "comments"),
      where("blogId", "==", `${blogId}`)
    ),

  notificationRef: collection(fireStore, "notifications"),

  notificationByIdRef: (notificationId: string | undefined) =>
    doc(fireStore, "notifications", `${notificationId}`),

  notificationByReceiverIdRef: (receiverId: string | undefined) =>
    query(
      collection(fireStore, "notifications"),
      where("receiverId", "==", `${receiverId}`)
    ),

  sotrageRef: (file: File | undefined) => ref(storage, "images/" + file?.name),
};

// addDoc(api.usersRef, {name: "samuel", userName: 'samuel', userId: 'generated from random firestore data'})
// getDocs(api.usersRef)
// getDoc(api.userByIdRef('shdajkfha3299'))
// PROGRESS NOT TO BE USED!!!! WORK
export const request = {
  // GET: (collection: DocumentReference<unknown>) => getDoc(collection),
  // getDocs: (query: Query<unknown>) => getDocs(query),
  // PATCH: (collection: DocumentReference<unknown>, data: Partial<unknown>) =>
  //   updateDoc(collection, data),
  // DELETE: (collection: DocumentReference<unknown>) => deleteDoc(collection),
  // POST: (reference: CollectionReference<unknown>, data: Partial<unknown>) =>
  //   addDoc(reference, data),
};

// request.GET(api.blogDescriptionByIdRef("laskdlas"));

// request.PATCH(api.blogMetaByIdRef("ashf89ksdhfkahfkas"), { hello: false });

// request.DELETE(api.blogDescriptionByIdRef("askjhf289jfhsajkfahsjk"));

// request.POST(api.commentsRef, { title: "newblog" });
