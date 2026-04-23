"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'Doe',
    email: user?.email || 'user@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in-up">
      <h1 className="section-title text-3xl mb-10">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-[#d80000]/20 to-[#d80000]/5 rounded-full flex items-center justify-center mb-5 border border-[#d80000]/20">
              <span className="material-symbols-outlined text-[#d80000]" style={{ fontSize: '48px' }}>person</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{formData.firstName} {formData.lastName}</h2>
            <p className="text-[#888] text-sm mb-1">{formData.email}</p>
            {user?.role && (
              <span className="inline-block mt-2 px-3 py-1 bg-[#d80000]/10 text-[#d80000] text-xs font-bold uppercase tracking-wider rounded-full border border-[#d80000]/20">
                {user.role}
              </span>
            )}

            <div className="flex flex-col gap-3 mt-6">
              <button className="btn-primary w-full text-sm py-3">Change Photo</button>
              <button className="btn-outline w-full text-sm py-3">Remove Photo</button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2a2a2a] space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-[#888]" style={{ fontSize: '20px' }}>mail</span>
                <span className="text-[#c0c0c0]">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-[#888]" style={{ fontSize: '20px' }}>call</span>
                <span className="text-[#c0c0c0]">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-[#888]" style={{ fontSize: '20px' }}>location_on</span>
                <span className="text-[#c0c0c0]">{formData.city}, {formData.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#d80000] rounded-full"></span>
              Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="glass-input" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="glass-input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="glass-input" />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">ZIP Code</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="glass-input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="glass-input" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                  Save Changes
                </button>
                <button type="button" className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#d80000] rounded-full"></span>
              Security
            </h3>
            <p className="text-[#888] text-sm mb-4">Manage your password and security settings</p>
            <button className="btn-outline">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
