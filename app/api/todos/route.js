import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/config/db';
import Todo from '../../../lib/models/TodoModel';

export async function POST(req) {
        await dbConnect();

        const { title, description } = await req.json(); // Assuming the request body is in JSON format

        if (!title || !description) {
                return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        try {
                await Todo.create({ title, description });
                return NextResponse.json({ message: 'Task added successfully' }, { status: 201 });
        } catch (error) {
                console.error('Error creating task:', error);
                return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
        }
}

export async function GET() {
        await dbConnect();

        try {
                const todos = await Todo.find();
                return NextResponse.json(
                        {
                                todos
                        },
                        {
                                status: 200
                        }
                );
        } catch (error) {
                return NextResponse.json(
                        {
                                error: error.message || 'Internal server error'
                        },
                        {
                                status: 500
                        }
                );
        }
}

export async function DELETE(req) {
        await dbConnect();

        try {
                const { searchParams } = new URL(req.url);
                const id = searchParams.get('id');

                if (!id) {
                        return NextResponse.json(
                                {
                                        message: 'ID is required'
                                },
                                {
                                        status: 400
                                }
                        );
                }

                const deletedTodo = await Todo.findByIdAndDelete(id);

                if (!deletedTodo) {
                        return NextResponse.json(
                                {
                                        message: 'Task not found'
                                },
                                {
                                        status: 404
                                }
                        );
                }

                return NextResponse.json(
                        {
                                message: 'Task deleted successfully'
                        },
                        {
                                status: 200
                        }
                );
        } catch (error) {
                return NextResponse.json(
                        {
                                error: error.message || 'Failed to delete task'
                        },
                        {
                                status: 500
                        }
                );
        }
}


export async function PUT(req) {
        await dbConnect();

        try {
                const { searchParams } = new URL(req.url);
                const id = searchParams.get('id');

                if (!id) {
                        return NextResponse.json(
                                {
                                        message: 'ID is required'
                                },
                                {
                                        status: 400
                                }
                        );
                }

                const updatedTodo = await Todo.findByIdAndUpdate(
                        id,
                        { isCompleted: true },
                        { new: true } // Return the updated document
                );

                if (!updatedTodo) {
                        return NextResponse.json(
                                {
                                        message: 'Task not found'
                                },
                                {
                                        status: 404
                                }
                        );
                }

                return NextResponse.json(
                        {
                                message: 'Task marked as completed',
                        },
                        {
                                status: 200
                        }
                );
        } catch (error) {
                return NextResponse.json(
                        {
                                error: error.message || 'Failed to complete task'
                        },
                        {
                                status: 500
                        }
                );
        }
}