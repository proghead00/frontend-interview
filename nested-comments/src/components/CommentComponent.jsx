import React, { useState } from "react";

const CommentComponent = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comment.content);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };
  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };

  const handleChange = (e) => {
    if (!editMode) setReplyContent(e.target.value);
    else setEditedContent(e.target.value);
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p>Votes: {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleDateString()}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            value={editedContent}
            onChange={handleChange}
            rows={3}
            cols={50}
            className="comment-textarea"
            placeholder="Add a new comment..."
          ></textarea>

          <button className="comment-btn" onClick={handleEditSubmit}>
            {" "}
            Save Edit
          </button>
          <button className="component-btn" onClick={toggleEditMode}>
            {" "}
            Cancel Edit
          </button>
        </div>
      )}

      <div className="comment-actions">
        <button className="comment-btn" onClick={toggleExpand}>
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button className="comment-btn" onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className="comment-btn"
          onClick={() => onDeleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              value={replyContent}
              onChange={handleChange}
              rows={3}
              cols={50}
              className="comment-textarea"
              placeholder="Add a new comment..."
            ></textarea>
          </div>

          <button className="comment-btn" onClick={handleReplySubmit}>
            Add Reply
          </button>

          {comment?.replies.map((reply) => {
            return (
              <CommentComponent
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
