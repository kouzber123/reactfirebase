import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { addDoc, collection, deleteDoc, getDocs, updateDoc, doc } from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(userCollectionRef, { username: newName, age: newAge, email: newEmail, password: newPassword });
  };
  const updateUser = async id => {
    const userDoc = doc(db, "users", id);
    const newFields = { username: newName, age: newAge, email: newEmail, password: newPassword };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async id => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <div className="App">
      <input onChange={e => setNewName(e.target.value)} type="text" placeholder="Name..." />
      <input onChange={e => setNewAge(e.target.value)} type="number" placeholder="age..." />
      <input onChange={e => setNewEmail(e.target.value)} type="text" placeholder="email..." />
      <input onChange={e => setNewPassword(e.target.value)} type="text" placeholder="password..." />
      <button onClick={createUser}>Create user</button>

      {users.map(user => {
        return (
          <div>
            <br />
            <input onChange={e => setNewName(e.target.value)} id="name" type="text" placeholder="Change name" />
            <input onChange={e => setNewAge(e.target.value)} id="age" type="number" placeholder="Change age" />
            <input onChange={e => setNewEmail(e.target.value)} id="email" type="text" placeholder="Change email" />
            <input onChange={e => setNewPassword(e.target.value)} id="password" type="text" placeholder="Change password" />
            <button onClick={() => updateUser(user.id)}>Update changes</button>

            <h1>Name: {user.username}</h1>
            <p>age: {user.age}</p>
            <p>email: {user.email}</p>
            <p>password: {user.password}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
