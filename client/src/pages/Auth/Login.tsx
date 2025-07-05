import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Loader } from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { login } from '../../services/authService';
import { setCredentials } from '../../store/slices/authSlice';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Authenticating...');

    try {
      const response = await login(formData);
      dispatch(setCredentials({ user: response.data, token: response.token }));
      toast.success('Welcome back!', { id: toastId });
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center py-10"
    >
      <Card className="w-full max-w-md border-primary/20 shadow-primary/10 shadow-2xl">
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-light">
            Sign In
          </motion.h2>
          <motion.p variants={itemVariants} className="text-center text-gray">
            Enter your credentials to access your account.
          </motion.p>
          
          <Input
            icon={<Mail size={18} />}
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <Input
            icon={<Lock size={18} />}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          
          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full h-[50px] flex items-center justify-center" disabled={loading}>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}}>
                    <Loader className="animate-spin" />
                  </motion.div>
                ) : (
                  <motion.span key="text" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}}>
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-center text-sm text-gray">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </motion.p>
        </motion.form>
      </Card>
    </motion.div>
  );
}