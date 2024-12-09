import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', username: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/students', formData);
      setStudents([...students, response.data]);
      setFormData({ name: '', email: '', username: '', phone: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/students/${editingId}`, formData);
      setStudents(students.map(student => student.id === editingId ? response.data : student));
      setFormData({ name: '', email: '', username: '', phone: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="App">
      <h1>Student Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.username}</td>
              <td>{student.phone}</td>
              <td>
                <button className='update-btn' onClick={() => handleEdit(student)}>Edit</button>
                <button className='delete-btn' onClick={() => handleDelete(student.id)}>Delete</button>
                <button className='view-btn'>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        {editingId ? (
          <button type="button" onClick={handleUpdate}>Update</button>
        ) : (
          <button type="button" onClick={handleAdd}>Add</button>
        )}
      </form>
    </div>
  );
};

export default App;
