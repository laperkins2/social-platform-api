import { Request, Response, NextFunction } from 'express';
import supabase from '../../supabaseInstance';

const getAllPosts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.get('/post');
    if (error) {
      response.status(500).json({ error: error.message });
    }

    response.json(data);
  } catch (error) {
    next(error);
  }
};

const addPost = (request: Request, response: Response, next: NextFunction) => {
  const { content } = request.body;

  try {
    const { data, error } = supabase.post('post', {
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

export { getAllPosts, addPost };
