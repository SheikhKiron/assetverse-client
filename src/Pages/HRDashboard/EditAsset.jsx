
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const EditAsset = () => {
  const { id } = useParams(); 
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const loadAsset = async () => {
      try {
        const res = await fetch(
          `https://assetverse-server-nine.vercel.app/hr/assets/${id}`
        );
        const data = await res.json();
        if (!res.ok) {
          toast(data.msg || 'Failed to load asset');
          return;
        }

      
        reset({
          productName: data.productName,
          productImage: data.productImage,
          productType: data.productType,
          productQuantity: data.productQuantity,
        });
      } catch (err) {
        console.error(err);
        toast.error('Error loading asset');
      } finally {
        setLoading(false);
      }
    };

    loadAsset();
  }, [id, reset]);

  const onSubmit = async formData => {
    try {
      const body = {
        productName: formData.productName,
        productImage: formData.productImage,
        productType: formData.productType,
        productQuantity: Number(formData.productQuantity),
      };

      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/hr/assets/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || 'Error updating asset');

      toast.success('Asset updated successfully!');
      navigate('/dashboard/assets'); 
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading asset...</p>;

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">Edit Asset</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            {...register('productName', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Product Image URL</span>
          </label>
          <input
            {...register('productImage', { required: true })}
            className="input input-bordered w-full"
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
          />
        </div>

        <button
          type="submit"
          className="btn w-full text-white"
          style={{ backgroundColor: '#1E5631' }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAsset;
