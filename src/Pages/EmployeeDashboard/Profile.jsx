import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://assetverse-server-nine.vercel.app/users/by-email/${user.email}`
      );
      const data = await res.json();
      setProfile(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    loadProfile();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://assetverse-server-nine.vercel.app/users/update-profile',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Update failed');
      toast.success('Profile updated!');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#1E5631]">My Profile</h2>
      <form onSubmit={handleSave} className="space-y-3">
        <div className="flex items-center gap-4 mb-3">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-[#28A745] ring-offset-2">
              <img
                src={
                  profile.profileImage || 'https://i.ibb.co/6WZ5jJQ/user.png'
                }
                alt={profile.name}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-xs text-gray-500 uppercase">{profile.role}</p>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            className="input input-bordered w-full"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email (read-only)</span>
          </label>
          <input
            className="input input-bordered w-full"
            value={profile.email || ''}
            readOnly
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            name="dateOfBirth"
            value={profile.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : ''}
            onChange={handleChange}
          />
        </div>

        {profile.role === 'hr' && (
          <>
            <div>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                name="companyName"
                value={profile.companyName || ''}
                onChange={handleChange}
              />
            </div>
            {/* Company logo update, etc. later */}
          </>
        )}

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

export default Profile;
