// Dashboard pageimport { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth.js';
import { Card } from '../components/ui/Card.jsx';
import { Key, Mail, UserCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-light">
          Welcome, <span className="text-primary">{user?.name}</span>
        </h1>
        <p className="text-gray mt-2">This is your personal dashboard. More features coming soon!</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray/20 pb-4">Your Profile</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-center">
              <UserCircle className="text-primary mr-4" />
              <span className="text-gray mr-2">Name:</span>
              <span className="text-light">{user?.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="text-primary mr-4" />
              <span className="text-gray mr-2">Email:</span>
              <span className="text-light">{user?.email}</span>
            </div>
            <div className="flex items-center">
              <Key className="text-primary mr-4" />
              <span className="text-gray mr-2">User ID:</span>
              <span className="text-light text-sm">{user?._id}</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}