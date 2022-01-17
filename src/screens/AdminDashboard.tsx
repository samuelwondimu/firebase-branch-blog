import { FC, useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Chart } from "react-google-charts";
import {
  getBlogs,
  // getAllComments,
  // getViews,
  getUsers,
} from "../services/firebase";
import moment from "moment";
import { LoadingIndicator } from "../components/LoadingIndicator";

export const AdminDashboard: FC = () => {
  const [blogs, setBlogs] = useState<any[][]>([["date", "blogs"]]);

  const [users, setUsers] = useState<any[][]>([["date", "users"]]);

  const [numberofBlogs, setNumberofBlogs] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfViews, setNumberOfViews] = useState(0);

  const topCardData = [
    {
      title: "Blogs",
      data: `${numberofBlogs}`,
      icon: <ChromeReaderModeIcon />,
    },
    {
      title: "Users",
      data: `${numberOfUsers}`,
      icon: <PeopleIcon />,
    },
    {
      title: "Likes",
      data: `${numberOfLikes}`,
      icon: <FavoriteIcon />,
    },

    {
      title: "Views",
      data: `${numberOfViews}`,
      icon: <VisibilityIcon />,
    },
  ];

  useEffect(() => {
    getBlogs().then((res) => {
      if (res) {
        setNumberofBlogs(res.length);

        setBlogs([
          ["date", "blogs"],
          ...res
            .filter((blog) =>
              moment(blog.createdAt).isBetween(
                moment().subtract(30, "days"),
                moment()
              )
            )
            .reduce((acc: any[], blog) => {
              const date = moment(blog.createdAt).format("YYYY-MM-DD");
              const dateExists = acc.find((item) => item[0] === date);

              if (dateExists) {
                dateExists[1] += 1;
              } else {
                acc.push([date, 1]);
              }
              return acc;
              
            }, [])
            .sort((a, b) => {
              return moment(a[0], "YYYY-MM-DD").diff(
                moment(b[0], "YYYY-MM-DD")
              );
            }),
        ]);

        let likes = res.reduce((acc: number, blog) => {
          acc += +`${blog?.likes?.length}`;
          return acc;
        }, 0);

        let views = res.reduce((acc: number, blog) => {
          acc += +`${blog.numViews}`;
          return acc;
        }, 0);

        setNumberOfLikes(likes);
        setNumberOfViews(views);
      }
    });
    getUsers().then((res) => {
      if (res) {
        setNumberOfUsers(res.length);
        setUsers([
          ["date", "users"],
          ...res
            .filter((user) =>
              moment(user.createdAt).isBetween(
                moment().subtract(30, "days"),
                moment()
              )
            )
            .reduce((acc: any[], user) => {
              const date = moment(user.createdAt).format("YYYY-MM-DD");
              const dateExists = acc.find((item) => item[0] === date);

              if (dateExists) {
                dateExists[1] += 1;
              } else {
                acc.push([date, 1]);
              }

              return acc;
            }, [])
            .sort((a, b) => {
              return moment(a[0], "YYYY-MM-DD").diff(
                moment(b[0], "YYYY-MM-DD")
              );
            }),
        ]);
      }
    });
    // getAllComments().then((res) => {
    //   let comments = res;
    //   getViews().then((res) => {
    //     let views = res;
    //     let anaylticsData = [
    //       ["date", "views", "comments"],
    //       ...views.filter((view) =>
    //         moment(view.createdAt).isBetween(
    //           moment().subtract(30, "days"),
    //           moment()
    //         )
    //       ),
    //     ];
    //   });
    // });
  }, []);
  console.log(blogs);
  return (
    <>
      <Grid container spacing={3} justifyContent={"space-between"}>
        {/* Top Card data */}
        {topCardData.map((data) => {
          return (
            <Grid item xs={12} sm={3}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                  py: 2,
                  height: "8rem",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={"bold"}>
                    {data.title}
                  </Typography>
                  <Typography variant="h3">{data.data}</Typography>
                </CardContent>
                <CardMedia>
                  <Box
                    p={2}
                    mr={4}
                    sx={{
                      background: "#f1f1f1",
                      borderRadius: 2,
                      color: "#2fa301",
                      fontSize: "1.5rem",
                    }}
                  >
                    {data.icon}
                  </Box>
                </CardMedia>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }}>
            <Chart
              chartType="Bar"
              data={blogs}
              width="100%"
              height="400px"
              legendToggle
              loader={<LoadingIndicator />}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }}>
            <Chart
              chartType="Bar"
              data={users}
              width="100%"
              height="400px"
              legendToggle
              loader={<LoadingIndicator />}
            />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }}>
            <Chart
              chartType="Line"
              data={users}
              width="100%"
              height="400px"
              legendToggle
              loader={<LoadingIndicator />}
            />
          </Paper>
        </Grid> */}
      </Grid>
    </>
  );
};
