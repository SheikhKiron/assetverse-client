// src/Pages/Auth/RegisterEmployee.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const RegisterEmployee = () => {
  const { register: fbRegister } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async data => {
    setError('');
    try {
      // Firebase registration
      await fbRegister(data.email, data.password);

      // Employee data - password added
      const employeeData = {
        name: data.name,
        email: data.email,
        password: data.password, // <-- FIXED PASSWORD
        dateOfBirth: data.dateOfBirth,
      };

      await axios.post(
        'http://localhost:5000/auth/register/employee',
        employeeData
      );

      alert('Employee Registered Successfully!');
      reset();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-xl p-6 rounded-xl bg-base-200 mt-10">
      <h2 className="text-3xl font-bold mb-5 text-center">Join as Employee</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name')}
          required
          placeholder="Full Name"
          className="input input-bordered w-full"
        />

        <input
          {...register('email')}
          type="email"
          required
          placeholder="Email Address"
          className="input input-bordered w-full"
        />

        <input
          {...register('password')}
          required
          minLength={6}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />

        <input
          type="date"
          {...register('dateOfBirth')}
          required
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
