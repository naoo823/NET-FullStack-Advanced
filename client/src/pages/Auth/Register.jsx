// Register formimport React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Loader } from 'lucide-react';

import { Card } from '../../components/ui/Card.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Input } from '../../components/ui/Input.jsx';
import { register } from '../../services/authService.js';
import { setCredentials } from '../../store/slices/authSlice.js';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Creating your account...');

    try {
      const response = await register(formData);
      dispatch(setCredentials({ user: response.data, token: response.token }));
      toast.success(`Account created! Welcome, ${response.data.name}!`, { id: toastId });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center py-10">
      <Card className="w-full max-w-md border-primary/20 shadow-primary/10 shadow-2xl">
        <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-6">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-light">Create Account</motion.h2>
          <motion.p variants={itemVariants} className="text-center text-gray">Join the NET community.</motion.p>
          <Input icon={<User size={18} />} type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <Input icon={<Mail size={18} />} type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <Input icon={<Lock size={18} />} type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full h-[50px] flex items-center justify-center" disabled={loading}>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}><Loader className="animate-spin" /></motion.div>
                ) : (
                  <motion.span key="text" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>Sign Up</motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
          <motion.p variants={itemVariants} className="text-center text-sm text-gray">Already have an account?{' '} <Link to="/login" className="font-semibold text-primary hover:underline">Sign In</Link></motion.p>
        </motion.form>
      </Card>
    </motion.div>
  );
}