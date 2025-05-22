'use client';

import { FaUsers, FaCalendarAlt, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Welcome to MS Discord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Join our vibrant community of gamers, tech enthusiasts, and creative minds.
            Experience a world of endless possibilities and make lasting connections.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="#join"
            className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
          >
            Join Our Server
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black"
            >
              <FaUsers className="text-3xl text-foreground mb-4 dark:text-white" />
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-white">Active Community</h3>
              <p className="text-muted-foreground dark:text-white">Join thousands of active members in daily discussions and activities.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black"
            >
              <FaCalendarAlt className="text-3xl text-foreground mb-4 dark:text-white" />
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-white">Regular Events</h3>
              <p className="text-muted-foreground dark:text-white">Participate in weekly gaming sessions, tournaments, and community events.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black"
            >
              <FaBook className="text-3xl text-foreground mb-4 dark:text-white" />
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-white">Knowledge Sharing</h3>
              <p className="text-muted-foreground dark:text-white">Learn from experts and share your knowledge with the community.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Server Rules</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Be respectful to all members",
              "No spamming or excessive caps",
              "Keep discussions in appropriate channels",
              "No NSFW content",
              "No self-promotion without permission",
              "Follow Discord's Terms of Service"
            ].map((rule) => (
              <motion.div
                key={rule}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg bg-black-50 dark:bg-black-800 shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <p className="text-gray-600 dark:text-gray-300">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 bg-black-50 dark:bg-black-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Join?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Click the button below to join our Discord server and become part of our amazing community!
          </p>
          <a
            href="https://discord.gg/your-invite-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Join Discord Server
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
