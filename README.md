# Todo Application

This is a simple Todo application built with React, Next.js, and Node.js. The application allows users to add, view, complete, and delete tasks. It uses Axios for making HTTP requests and React Toastify for notifications.

## Features

- Add new tasks
- View a list of tasks
- Mark tasks as completed
- Delete tasks
- Notifications for successful and error operations

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Application Demo

```bash
https://todolist-nextjs-one.vercel.app/
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/bharathsurya021/todolist-nextjs.git todos
cd todos
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory of your project and add the following environment variables:

```env
# .env.local
MONGODB_URI='YOUR MONGO URL STRING'
```

### Running the Application

#### Development

To run the application in development mode, use the following command:

```bash
npm run dev
# or
yarn dev
```

This will start the application on `http://localhost:3000`.

#### Production

To build and run the application in production mode, use the following commands:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### API Endpoints

Developement - http://localhost:3000

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos?id=<todoId>` - Mark a todo as completed
- `DELETE /api/todos?id=<todoId>` - Delete a todo

## Contributing

If you would like to contribute to this project, please open a pull request or submit an issue on GitHub.

## License

This project is licensed under the MIT License.

```

Feel free to adjust the content according to your project's specifics and preferences. Make sure to replace `your-username` in the clone URL with your actual GitHub username or the correct URL to your repository.
```
