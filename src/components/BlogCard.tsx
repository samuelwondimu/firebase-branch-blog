import { FC } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

interface BlogDescriptionProps {
  blog: {
    id?: string | undefined;
    blogger: string | undefined;
    bloggerId: string | undefined;
    bloggerImage: string | undefined;
    coverImage: string | undefined;
    createdAt: any | undefined;
    deleted: boolean | undefined;
    description: string | undefined;
    numComments: number | undefined;
    numLikes: number | undefined;
    likes: any[] | undefined;
    numViews: number | undefined;
    readTime: number | undefined;
    status: boolean | undefined;
    title: string | undefined;
  };
}

export const BlogCard: FC<BlogDescriptionProps> = ({ blog }) => {
  return (
    <Grid item xs={12} md={4}>
      <CardActionArea component={Link} to={`/blog/${blog.id}`}>
        <Card elevation={0}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={blog.coverImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              gutterBottom
            >
              {blog.createdAt} by {blog.blogger} | {blog.readTime} min read
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: `${blog?.description?.slice(0, 300)}...`,
              }}
            />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Typography fontWeight={"bold"}>
              {blog.likes?.length} like |
            </Typography>
            <Typography fontWeight={"bold"}>
              {blog.numComments} comments |
            </Typography>
            <Typography fontWeight={"bold"}>{blog.numViews} views </Typography>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
