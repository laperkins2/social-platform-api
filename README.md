# Social Interaction Platform Backend

This is a **Social Interaction Platform** using **Express** with **TypeScript** and **Supabase** for data storage. This server will manage posts, comments, and likes for a social interaction platform.

## Features

- **Post**: Create, view, and retrieve specific posts.
- **Comments**: Add and view comments for specific posts.
- **Likes**: Add likes to posts and comments

### Supabase Integration/ Tech Stack

- **Backend**: Express with TypeScript
- **Database**: Use Supabase as your PostgreSQL database and connect to it through the Supabase client.
- Manage migrations using Supabase’s CLI or any migration tool of your choice.
- **HTTP Request**: Axios(interaction with Supabase)
- **Environment Management**: dotenv

### Tables

1. **Post**: Stores information about posts (id, content, timestamp).
2. **Comment**: Stores user comments for posts, with a foreign key to the Post table.
3. **PostLike**: Stores likes for posts and comments, with foreign keys to the Post and Comment tables.

#### SQL Database Schema

```sql
create table Post (
  id bigint primary key generated always as identity,
  content text,
  timestamp timestamp with time zone DEFAULT NOW()
);

create table comment (
  id bigint primary key generated always as identity,
  PostID bigint,
  content text,
  timestamp timestamp with time zone DEFAULT NOW(),
  foreign key (PostID) references Post (id) on delete cascade
);

create table PostLike (
  id bigint primary key generated always as identity,
  PostID bigint,
  CommentID bigint,
  timestamp timestamp with time zone DEFAULT NOW(),
  foreign key (PostID) references Post (id) on delete cascade,
  foreign key (CommentID) references comment (id) on delete cascade
);
```

## API Endpoints

### 1. Post

- **POST /posts**: Create a new post.

  - Body: `{ "content": "string" }`
  - Response: `201 Created` with the new post’s data.

- **GET /posts**: Retrieve all posts.

  - Response: List of posts ordered by timestamp, including the number of comments and likes.

- **GET /posts/:id**: Retrieve a specific post by its id.
  - Response: The post data, including all comments and likes.

### 2. Comments

- **POST /posts/:id/comments**: Add a comment to a specific post.
  - Body: `{ "content": "string" }`
  - Response: `201 Created` with the new comment’s data.

### Post Likes

- **POST /posts/:id/likes**: Add a like to a post.

  - Response: `201 Created`.

- **POST /comments/:id/likes**: Add a like to a comment.
  - Response: `201 Created`.

### 4. Data Validation

Use middleware to validate incoming requests:

- Ensure content fields are non-empty strings.
- Validate the existence of `PostID` when creating comments and likes (check the database to ensure the related post exists).
- Validate the existence of `CommentID` when adding likes to comments.

### 5. Error Handling

Implement error handling for:

- Missing resources (e.g., requesting a non-existent post).
- Invalid data (e.g., empty content).
- Database connection issues.
