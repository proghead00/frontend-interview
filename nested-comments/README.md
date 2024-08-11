# LLD:

```
interface Comment {
    id: number;
    content: string;
    votes: number;
    timestamp: string;
    replies: Comment[];
}
```

```
interface NestedCommentsProps {
    comments: Comment[];
    onSubmit: (content: string) => void;
    onEdit: (content: string) => void;
    onDelete: (commentId: number) => void;
    onUpvote: (commentId: number) => void;
    onDownvote: (commentId: number) => void;
    
}
```