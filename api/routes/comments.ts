import { Request, Response, NextFunction } from 'express';
import supabase from '../../supabaseInstance';

const getAllCommentsByID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const commentsID = request.params.id;
    const { data } = await supabase.get(`/comment?postid=eq.${commentsID}`);

    if (!data) {
      response.status(500).json({ error: 'Failed to fetch comments' });
      return;
    }

    response.json(data);
  } catch (error) {
    next(error);
  }
};

const addComment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const postId = request.params.id;
  const { content } = request.body;

  try {
    const { data } = await supabase.post('comment', {
      postid: postId,
      content,
    });

    if (!data) {
      response.status(500).json({ error: 'Failed to add comment' });
      return;
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllCommentsByID, addComment };
