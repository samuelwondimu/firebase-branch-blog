import { FC, useState } from "react";
import moment from "moment";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { stringAvatar } from "../utils/StringAvatar";

export const Comment: FC<any> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          avatar={
            comment?.avatar ? (
              <Avatar alt={comment?.userId} src={comment?.avatar} />
            ) : (
              comment?.userName && (
                <Avatar
                  alt={comment?.userId}
                  {...stringAvatar(`${comment?.userName}`)}
                />
              )
            )
          }
          title={<Typography>{comment?.userName}</Typography>}
          subheader={moment(comment?.createdAt).fromNow()}
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
        <CardActions>
          <Button size="small">{comment.reply.length} replies</Button>
          <Button size="small" onClick={() => setShowReplies((prev) => !prev)}>
            show reply
          </Button>
        </CardActions>
        <Box ml={4}>
          {showReplies && (
            <>
              {comment?.reply.map((reply: any) => (
                <Box sx={{backgroundColor: '#e2e2e2', borderRadius: 2}} mb={2}>
                  <CardHeader
                    avatar={
                      reply?.avatar ? (
                        <Avatar alt={reply?.userId} src={reply?.avatar} />
                      ) : (
                        reply?.userName && (
                          <Avatar
                            alt={reply?.userId}
                            {...stringAvatar(`${reply?.userName}`)}
                          />
                        )
                      )
                    }
                    title={<Typography>{reply?.userName}</Typography>}
                    subheader={moment(reply?.createdAt).fromNow()}
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
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => setShowReplyInput((prev) => !prev)}
                    >
                      {" "}
                      reply
                    </Button>
                  </CardActions>
                </Box>
              ))}
              {showReplyInput && (
                <Box>
                  <TextField fullWidth multiline rows={4} />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Reply
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Card>
    </>
  );
};
