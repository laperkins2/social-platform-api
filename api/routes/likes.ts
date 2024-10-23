import { Request, Response, NextFunction, request } from 'express';
import supabase from '../../supabaseInstance';

const getAllLikesByID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const likesID = request.params.id;
    const { data } = await supabase
      .get(`/postlike?commentid=eq.${likesID}`)
      .catch((error) => {
        console.log(error);
        response.status(500).json({ error: error.message });
        return { data: null };
      });

    if (!data) {
      return;
    }

    response.json(data);
  } catch (error) {
    next(error);
  }
};

const likePost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const postId = request.params.id;

  try {
    const { data } = await supabase
      .post('postlike', {
        postid: postId,
      })
      .catch((error) => {
        response.status(500).json({ error: error.message });
        return { data: null };
      });

    if (!data) {
      return;
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const likeComment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const commentId = request.params.id;

  try {
    const { data } = await supabase
      .post('commentlike', {
        commentid: commentId,
      })
      .catch((error) => {
        response.status(500).json({ error: error.message });
        return { data: null };
      });

    if (!data) {
      return;
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllLikesByID, likePost, likeComment };
