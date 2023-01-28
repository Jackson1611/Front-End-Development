import React from 'react';

interface Props {
    todos: Array<{
		description: string;
		date: string;
	}>;
    handleDelete: (index: number) => void;
}

const TodoTable: React.FC<Props> = ({ todos, handleDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo.date}</td>
                        <td>{todo.description}</td>
                        <td>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TodoTable;

