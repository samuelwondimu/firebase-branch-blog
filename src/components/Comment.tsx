import { FC } from "react";
import moment from "moment";

import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { stringAvatar } from "../utils/StringAvatar";

interface CommentType {
  comment: {
    docId: string | undefined;
    commentText: string | undefined;
    blogId: string | undefined;
    avatar: string | undefined;
    userName: string | undefined;
    userId: string | undefined;
    reply: {
      avatar: string | undefined;
      replyText: string | undefined;
      userId: string | undefined;
      userName: string | undefined;
      createdAt: string | undefined;
    }[] | undefined;
    createdAt: any;
  };
}

export const Comment: FC<CommentType> = ({ comment }) => {
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          avatar={
            comment?.avatar ? (
              <Avatar alt={comment?.userId} src={comment?.avatar} />
            ) : (
              comment?.userName && (
                <Avatar alt={comment?.userId} {...stringAvatar(`${comment?.userName}`)} />
              )
            )
          }
          title={<Typography>{comment?.userName}</Typography>}
          subheader={moment(comment?.createdAt.toDate()).fromNow()}
        />
        <CardContent sx={{ mt: -3 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "400",
              letterSpacing: "1px",
            }}
          >
            {comment?.commentText}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
