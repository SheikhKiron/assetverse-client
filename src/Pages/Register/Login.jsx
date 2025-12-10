import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await login(data.email, data.password);
      alert('Login Success!');
      navigate('/');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          {...register('email')}
          required
        />
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          {...register('password')}
          required
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
