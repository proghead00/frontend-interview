import React, { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, content) => {
    /*
        1
          2
            3 (go deep to the leaf node)

        4
    */

    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment?.replies?.length) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }

      return comment;
    });
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (comment?.replies?.length) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }

      return comment;
    });
  };

  const deleteNode = (tree, commentId) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc;
      } else if (comment?.replies?.length) {
        comment.replies = deleteNode(comment.replies, commentId);
      }

      return [...acc, comment];
    }, []);
  };

  const inserComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      // we have a reply
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editComment = (commentId, newEditContent) => {
    // const newComment = {
    //   id,
    //   content: newEditContent,
    //   votes: 0,
    //   timestamp: new Date().toISOString(),
    //   replies: [],
    // };

    // if (commentId) {
    //   setComments(newEditContent);
    // }

    setComments((prevComments) =>
      editNode(prevComments, commentId, newEditContent)
    );
  };

  const deleteComment = (commentId, newEditContent) => {
    // const newComment = {
    //   id,
    //   content: newEditContent,
    //   votes: 0,
    //   timestamp: new Date().toISOString(),
    //   replies: [],
    // };

    // if (commentId) {
    //   setComments(newEditContent);
    // }

    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  return {
    comments,
    inserComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
