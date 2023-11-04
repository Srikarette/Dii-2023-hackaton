import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // Import Axios

const Form = styled.form`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [editingAccountId, setEditingAccountId] = useState(null);

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูลบัญชีทั้งหมด
    axios
      .get("http://localhost:8080/admins")
      .then((response) => {
        setAccounts(response.data); // ตั้งค่าข้อมูลบัญชีให้กับตัวแปร accounts
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบัญชี: ", error);
      });
  }, []);

  const handleEdit = (id) => {
    setEditingAccountId(id);
    const accountToEdit = accounts.find((account) => account.id === id);
    setUsername(accountToEdit.username);
    setPassword(accountToEdit.password);
    setEmail(accountToEdit.email);
    setAgency(accountToEdit.agency)
  };

  const handleDelete = (id) => {
    // ทำการเรียก API เพื่อลบบัญชี
    axios
      .delete(`http://localhost:8080/admins/${id}`)
      .then(() => {
        const updatedAccounts = accounts.filter((account) => account.id !== id);
        setAccounts(updatedAccounts);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการลบบัญชี: ", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingAccountId(null);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const handleSaveEdit = () => {
    // ทำการเรียก API เพื่อบันทึกการแก้ไขบัญชี
    const updatedAccount = {
      id: editingAccountId,
      username,
      password,
      email,
      agency,
    };

    axios
      .patch(`http://localhost:8080/admins/${editingAccountId}`, updatedAccount)
      .then(() => {
        const updatedAccounts = accounts.map((account) =>
          account.id === editingAccountId ? updatedAccount : account
        );
        setAccounts(updatedAccounts);
        setEditingAccountId(null);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการบันทึกการแก้ไขบัญชี: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAccount = {
      username,
      password,
      email,
      agency,
    };

    // ทำการเรียก API โดยใช้เมธอด POST
    axios
      .post("http://localhost:8080/admins", newAccount)
      .then((response) => {
        const createdAccount = response.data;

        // หลังจากสร้างบัญชีสำเร็จ คุณอาจต้องทำสิ่งอื่นๆ เช่นอัปเดตรายชื่อบัญชีใหม่ใน state หรือในรายการบัญชีที่แสดงผล
        // เพิ่ม createdAccount ลงใน state หรือรายการบัญชีที่คุณใช้ในแอ็พ

        // ตัวอย่าง:
        const updatedAccounts = [...accounts, createdAccount];
        setAccounts(updatedAccounts);

        // ล้างฟอร์ม
        setUsername("");
        setPassword("");
        setEmail("");
        setAgency("");
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการสร้างบัญชี: ", error);
      });
  };

  return (
    <>
      {editingAccountId ? (
        <div>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Agency"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
          <Button onClick={handleSaveEdit}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Agency"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}

      <List>
        {accounts.map((account) => (
          <ListItem key={account.id}>
            {account.username} - {account.password}
            <div>
              <Button onClick={() => handleEdit(account.id)}>Edit</Button>
              <Button onClick={() => handleDelete(account.id)}>Delete</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Admin;
