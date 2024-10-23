import { Request, Response, NextFunction } from 'express';
import supabase from '../../supabaseInstance';

const getAllPosts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { data } = await supabase.get('/post');
    response.json(data);
  } catch (error) {
    next(error);
  }
};

const addPost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { content } = request.body;

  try {
    const { data } = await supabase.post('post', {
      content,
    });

    if (!data) {
      response.status(500).json({ error: 'Failed to add post' });
      return;
    }

    response.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, addPost };
