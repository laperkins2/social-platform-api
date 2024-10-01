import { Request, Response, NextFunction, request } from 'express';
import supabase from '../../supabaseInstance';

const getAllLikesByID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const likesID = request.params.id;
    const { data, error } = await supabase.get(
      `/postlike?commentid=eq.${likesID}`
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

const likePost = (request: Request, response: Response, next: NextFunction) => {
  const postId = request.params.id;

  try {
    const { data, error } = supabase.post('postlike', {
      postid: postId,
    });

    if (error) {
      response.status(500).json({ error: error.message });
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const likeComment = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const commentId = request.params.id;

  try {
    const { data, error } = supabase.post('commentlike', {
      commentid: commentId,
    });

    if (error) {
      response.status(500).json({ error: error.message });
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllLikesByID, likePost, likeComment };
