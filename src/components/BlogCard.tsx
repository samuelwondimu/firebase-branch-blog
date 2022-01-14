import { FC } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  CardActions,
  Button,
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
    numViews: number | undefined;
    readTime: number | undefined;
    status: boolean | undefined;
    title: string | undefined;
  };
}

export const BlogCard: FC<BlogDescriptionProps> = ({ blog }) => {
  return (
    <Grid item xs={4}>
      <CardActionArea component={Link} to={`/blog/${blog.id}`}>
        <Card>
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
            <Typography variant="body2" color="textSecondary" component="div" gutterBottom>
              {blog.createdAt} by {blog.blogger}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: `${blog?.description?.slice(0, 300)}...`,
              }}
            />
          </CardContent>
          <CardActions>
            <Button size="small">{blog.numLikes} likes</Button>
            <Button size="small"> {blog.numComments} comments</Button>
            <Button size="small">{blog.numViews} views</Button>
            <Button size="small">{blog.readTime} min read</Button>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
