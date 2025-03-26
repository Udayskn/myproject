import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: "", rollnumber: "", cgpa: "" });
    const [editingStudent, setEditingStudent] = useState(null);
    const [search, setSearch] = useState("");

    const API_URL = "http://127.0.0.1:8000/api/students/";

    // Fetch students from Django API
    const fetchStudents = async () => {
        const res = await axios.get(`${API_URL}?search=${search}`);
        console.log("API Response:", res.data);
        setStudents(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, [search]);

    // Handle input change
    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    // Create new student
    const handleCreate = async (e) => {
        e.preventDefault();
        await axios.post(API_URL, newStudent);
        setNewStudent({ name: "", rollnumber: "", cgpa: "" });
        fetchStudents();
    };

    // Delete student
    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}${id}/`);
        fetchStudents();
    };

    // Set student to edit
    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    // Update student
    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}${editingStudent.id}/`, editingStudent);
        setEditingStudent(null);
        fetchStudents();
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Student List</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by Name or roll number"
                className="p-2 border rounded w-full mb-4"
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Add Student Form */}
            <form className="mb-4 flex gap-2" onSubmit={editingStudent ? handleUpdate : handleCreate}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editingStudent ? editingStudent.name : newStudent.name}
                    onChange={editingStudent ? (e) => setEditingStudent({ ...editingStudent, name: e.target.value }) : handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="rollnumber"
                    placeholder="Roll Number"
                    value={editingStudent ? editingStudent.rollnumber : newStudent.roll_number}
                    onChange={editingStudent ? (e) => setEditingStudent({ ...editingStudent, rollnumber: e.target.value }) : handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="cgpa"
                    placeholder="CGPA"
                    value={editingStudent ? editingStudent.cgpa : newStudent.cgpa}
                    onChange={editingStudent ? (e) => setEditingStudent({ ...editingStudent, cgpa: e.target.value }) : handleChange}
                    className="p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editingStudent ? "Update" : "Add"}
                </button>
            </form>

            {/* Student Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Roll Number</th>
                        <th className="border p-2">CGPA</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border">
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2">{student.rollnumber}</td>
                            <td className="border p-2">{student.cgpa}</td>
                            <td className="border p-2 flex gap-2">
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(student)}>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(student.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
