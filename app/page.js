"use client"
import Todo from "@/components/Todo";
import EmptyListMessage from "@/components/EmptyListMessage";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const [todoList, setTodoList] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/todos', formData);
      if (response?.status === 201) {
        toast.success(response?.data?.message);
        setFormData({
          title: "",
          description: ""
        });
        fetchTodos();
      } else {
        toast.error(response.data.error || 'Error adding task!');
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Error adding task!');
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      if (response?.status === 200) {
        setTodoList(response?.data?.todos);
      } else {
        toast.error(response.data.error || 'Server Error!');
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Server Error!');
    }
  };

  const handleComplete = useCallback(async (id) => {
    try {
      const response = await axios.put(`/api/todos/?id=${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchTodos();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Error updating task!');
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await axios.delete(`/api/todos?id=${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchTodos();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Error deleting task!');
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto" onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleOnChange} placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea name="description" value={formData.description} onChange={handleOnChange} placeholder="Enter description" className="px-3 py-2 border-2 w-full" ></textarea>
        <button type="submit" className="bg-blue-600 py-3 px-11 text-white border-radius-[8px]">Add Task</button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList.length === 0 ? (
              <EmptyListMessage />
            ) : (
              todoList.map((todoItem, index) => {
                return <Todo key={todoItem._id} title={todoItem.title} description={todoItem.description} complete={todoItem.isCompleted} id={index} uuid={todoItem._id} handleComplete={handleComplete} handleDelete={handleDelete} />
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
