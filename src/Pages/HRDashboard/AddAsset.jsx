// src/Pages/HRDashboard/AddAsset.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const AddAsset = () => {
  const { appUser } = useAuth(); // backend user: HR (email, companyName সহ)
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    try {
      if (!appUser || appUser.role !== 'hr') {
        alert('Only HR can add assets.');
        return;
      }

      const body = {
        productName: data.productName,
        productImage: data.productImage,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        hrEmail: appUser.email,
        companyName: appUser.companyName,
      };

      const res = await fetch(
        'https://assetverse-server-nine.vercel.app/hr/assets',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || 'Error adding asset');

      alert('Asset added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">Add New Asset</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            {...register('productName', { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Dell Latitude 7420"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Product Image URL</span>
          </label>
          <input
            {...register('productImage', { required: true })}
            className="input input-bordered w-full"
            placeholder="Image URL (ImgBB/Cloudinary)"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Product Type</span>
          </label>
          <select
            {...register('productType', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            min={1}
            {...register('productQuantity', { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 10"
          />
        </div>

        <button
          type="submit"
          className="btn w-full text-white"
          style={{ backgroundColor: '#1E5631' }}
        >
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
