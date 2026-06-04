export interface CommentData {
  type: string;
  comments: Array<{
    id: number;
    pseudo: string;
    content: string;
    date: string;
  }>;
}
