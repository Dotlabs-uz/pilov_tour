"use client";
import { useState, ChangeEvent } from "react";
import { account, ID } from "../appwrite";
import type { Models } from "appwrite";

interface FormState {
  email: string;
  password: string;
  name: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(form.email, form.password);
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      await account.create(ID.unique(), form.email, form.password, form.name);
      await login();
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <button onClick={login} disabled={loading}>
        Login
      </button>
      <button onClick={register} disabled={loading}>
        Register
      </button>
    </div>
  );
}
