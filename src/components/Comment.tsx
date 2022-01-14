import { FC, useState } from "react";
import moment from "moment";

import {
  Alert,
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
import { ReplyOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/user-auth";
import { addReply } from "../services/firebase";

export const Comment: FC<any> = ({ comment }) => {
  const auth = useAuth();
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(values: any) {
    if (!auth?.user) return;
    await addReply(
      `${auth?.user?.displayName}`,
      `${auth?.user?.uid}`,
      `${comment.docId}`,
      `${auth?.user?.photoURL}`,
      values.reply
    );
    setShowReplyInput(false);
    // update the comment
    comment.reply.push({
      userName: `${auth?.user?.displayName}`,
      userId: `${auth?.user?.uid}`,
      commentText: values.reply,
      avatar: `${auth?.user?.photoURL}`,
      createdAt: new Date().toISOString(),
    });
    reset({ reply: "" });
  }

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
          <Button
            size="small"
            onClick={() => setShowReplyInput((prev) => !prev)}
            startIcon={<ReplyOutlined />}
          >
            reply
          </Button>
          <Button size="small" onClick={() => setShowReplies((prev) => !prev)}>
            {comment.reply.length} replies
          </Button>
        </CardActions>
        <Box ml={4}>
          {showReplyInput && (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ pb: 2 }}
            >
              {errors?.email && (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors?.email?.message}
                </Alert>
              )}
              <TextField
                fullWidth
                multiline
                rows={4}
                {...register("reply", {
                  required: "Required",
                })}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Reply
              </Button>
            </Box>
          )}
          {showReplies && (
            <>
              {comment?.reply
                .sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1))
                .map((reply: any) => (
                  <Box
                    sx={{ backgroundColor: "#e2e2e2", borderRadius: 2 }}
                    mb={2}
                  >
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
                  </Box>
                ))}
            </>
          )}
        </Box>
      </Card>
    </>
  );
};
