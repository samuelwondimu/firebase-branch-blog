import { FC } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

interface BlogDescriptionProps {
  docId: string;
  blogger: string;
  bloggerId: string;
  bloggerImage: string;
  coverImage: string;
  createdAt: any;
  deleted: boolean;
  description: string;
  numComments: number;
  numLikes: number;
  numViews: number;
  readTime: number;
  status: boolean;
  title: string;
}

export const BLogCard: FC<BlogDescriptionProps> = ({
  docId,
  title,
  blogger,
  bloggerId,
  bloggerImage,
  description,
  coverImage,
  numComments,
  numLikes,
  numViews,
  readTime,
  createdAt,
}) => {
  const date = createdAt && createdAt.toDate().toDateString();

  return (
    <Grid item xs={12}>
      <CardActionArea component={Link} to={`/blog/${docId}`}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              component="h2"
              variant="h5"
              gutterBottom
              fontWeight={"bold"}
            >
              {title.slice(0, 70)}
            </Typography>
            <Typography variant="body2" color="GrayText" sx={{ py: 1 }}>
              {date} by {blogger}
            </Typography>
            <Box
              component={Typography}
              paragraph
              fontSize={"1.2rem"}
              dangerouslySetInnerHTML={{
                __html: `${description.slice(0, 150)}`,
              }}
            />
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "240px",
              height: "280px",
              display: { xs: "none", sm: "block" },
            }}
            image={coverImage}
            alt={"image"}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};
