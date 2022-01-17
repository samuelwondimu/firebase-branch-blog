import moment from "moment";
import { useState, useEffect } from "react";
import { getBlogs, getUsers } from "../services/firebase";
import { BlogType, UserType } from "../services/types";

export const useBlogsGraph = () => {
  const [graphData, setGraphData] = useState<any[][]>([["date", "blogs"]]);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  useEffect(() => {
    const getAllBlogs = async () => {
      await getBlogs().then((res) => {
        if (res) {
          setBlogs(res);
          setGraphData([
            ["date", "name"],
            [moment(res[0].createdAt).format("MMM Do YY"), res[0].title],
          ]);
        }
      });
    };

    return () => {
      getAllBlogs();
    };
  }, []);

  return { graphData, blogs };
};

export const useUsersGraph = () => {
  const [graphData, setGraphData] = useState<any[][]>([["date", "users"]]);
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      getUsers().then((res) => {
        if (res) {
          setUsers(res);
          setGraphData([
            ["date", "name"],
            [moment(res[0].createdAt).format("MMM Do YY"), res[0].user],
          ]);
        }
      });
    };

    return () => {
      getAllUsers();
    };
  }, []);

  return { graphData, users };
};
