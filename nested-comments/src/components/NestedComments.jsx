import React, { useState } from "react";
import "./NestedComment.css";
import useCommentTree from "../hooks/useCommentTree";
import CommentComponent from "./CommentComponent";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  //..........

  // Destructuring the hook's teturn values:
  const {
    comments: commentsData, // storing in a new variable commentsData
    inserComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const [comment, setComment] = useState("");

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  const handleReply = (commentId, content) => {
    inserComment(commentId, content);
    onSubmit(content);
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    onDelete(commentId);
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        ></textarea>
      </div>

      <button className="comment-btn" onClick={handleSubmit}>
        Add Comment
      </button>

      {commentsData.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
        />
      ))}
    </>
  );
};

export default NestedComments;
