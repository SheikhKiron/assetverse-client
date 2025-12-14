import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RegisterHR = () => {
  const { register: fbRegister } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState('');
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
const navigate=useNavigate()
  const onSubmit = async data => {
    setError('');
    try {
      // Firebase Auth
      await fbRegister(data.email, data.password);

      // Upload Logo to ImgBB
      const formData = new FormData();
      formData.append('image', data.companyLogo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );

      const uploadedLogoUrl = imgRes.data.data.display_url;

      // Final HR data with password included
      const hrData = {
        name: data.name,
        email: data.email,
        password: data.password,
        companyName: data.companyName,
        companyLogo: uploadedLogoUrl,
        dateOfBirth: data.dateOfBirth,
      };

      await axios.post(
        'https://assetverse-server-nine.vercel.app/auth/register/hr',
        hrData
      );

      alert('HR Registered Successfully!');
      navigate('/');
      reset();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Join as HR Manager</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="input input-bordered w-full"
          {...register('name')}
          placeholder="Full Name"
          required
        />
        <input
          className="input input-bordered w-full"
          {...register('companyName')}
          placeholder="Company Name"
          required
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          {...register('companyLogo')}
          accept="image/*"
          required
        />
        <input
          type="email"
          className="input input-bordered w-full"
          {...register('email')}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="input input-bordered w-full"
          {...register('password')}
          placeholder="Password"
          required
        />
        <input
          type="date"
          className="input input-bordered w-full"
          {...register('dateOfBirth')}
          required
        />
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterHR;
