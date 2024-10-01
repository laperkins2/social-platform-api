import { Request, Response, NextFunction } from 'express';
import supabase from '../../supabaseInstance';

const getAllCommentsByID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const commentsID = request.params.id;
    const { data, error } = await supabase.get(
      `/comment?postid=eq.${commentsID}`
    );

    if (error) {
      console.log(error);
      response.status(500).json({ error: error.message });
    }

    response.json(data);
  } catch (error) {
    next(error);
  }
};

const addComment = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const postId = request.params.id;
  const { content } = request.body;

  try {
    const { data, error } = supabase.post('comment', {
      postid: postId,
      content,
    });

    if (error) {
      response.status(500).json({ error: error.message });
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllCommentsByID, addComment };
