
let students = [
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", username: "Bret", phone: "1-770-736-8031 x56442" },
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", username: "Bret", phone: "1-770-736-8031 x56442" },
]

export const getStudents = (req, res) => {
    res.json(students);
}

export const createStudent = (req, res) => {
    const newStudent = {id: students.length + 1, ...req.body}
    students.push(newStudent);
    res.status(201).send(newStudent)
}

export const updateStudent = (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(student => student.id == id);
    if (index !== -1) {
      students[index] = { ...students[index], ...req.body };
      res.json(students[index]);
    } else {
      res.status(404).json({ message: "Student not found" });
    }

}

export const deleteStudent = (req, res) => {
    const { id } = req.params;
    students = students.filter(student => student.id != id);
    res.status(204).send()

}

