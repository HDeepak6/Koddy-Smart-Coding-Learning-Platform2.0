import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Star, Users, Play, CheckCircle, 
  CreditCard, MessageSquare, X, Send, Menu, LogOut, 
  User, Home, Layers, Heart, Bell, ChevronRight,
  Code, Cpu, Database, Globe, Smartphone, Sparkles
} from 'lucide-react';
import { COURSES, Course } from './constants';
import { askKoddy } from './services/ai';

// --- Types ---
interface UserData {
  id: number;
  name: string;
  email: string;
}

// --- Components ---

const Navbar = ({ user, onLogout, setPage }: { user: UserData | null, onLogout: () => void, setPage: (p: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('landing')}>
      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <Code className="text-black w-6 h-6" />
      </div>
      <span className="text-2xl font-bold tracking-tighter text-white">KODDY</span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
      <button onClick={() => setPage('dashboard')} className="hover:text-white transition-colors">Home</button>
      <button onClick={() => setPage('courses')} className="hover:text-white transition-colors">Courses</button>
      <button onClick={() => setPage('my-learning')} className="hover:text-white transition-colors">My Learning</button>
      <button onClick={() => setPage('profile')} className="hover:text-white transition-colors">Profile</button>
    </div>

    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <User size={18} />
          </div>
          <button onClick={onLogout} className="text-white/70 hover:text-white transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('login')} className="text-white/70 hover:text-white transition-colors font-medium">Login</button>
          <button onClick={() => setPage('signup')} className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-emerald-400 transition-all">Sign Up</button>
        </div>
      )}
    </div>
  </nav>
);

const LandingPage = ({ onStart }: { onStart: (mode: 'login' | 'signup' | 'guest') => void }) => (
  <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
    {/* Hero Section */}
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8"
      >
        <Sparkles size={16} />
        <span>Learn Coding the Smart Way</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
      >
        Master the Future <br /> of Technology
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-white/60 max-w-2xl mb-12"
      >
        Join 50,000+ students learning from industry experts. Interactive courses, 
        AI-powered assistance, and a community of builders.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button onClick={() => onStart('signup')} className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
          Get Started for Free
        </button>
        <button onClick={() => onStart('guest')} className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95">
          Continue as Guest
        </button>
      </motion.div>

      {/* Tech Marquee - New Interactive Element */}
      <div className="mt-20 w-full overflow-hidden relative py-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-4 text-white/20 text-4xl font-black italic uppercase tracking-widest">
                <Code size={40} /> PYTHON <Cpu size={40} /> JAVASCRIPT <Globe size={40} /> REACT <Database size={40} /> AI <Smartphone size={40} /> MOBILE <Sparkles size={40} /> DATA SCIENCE
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Floating Cards */}
      <div className="relative mt-10 w-full max-w-5xl h-[400px]">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-64 p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-emerald-500/50 transition-colors cursor-pointer"
        >
          <div className="w-full h-32 rounded-2xl bg-emerald-500/20 mb-4 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
          </div>
          <div className="h-4 w-3/4 bg-white/20 rounded-full mb-2" />
          <div className="h-4 w-1/2 bg-white/10 rounded-full" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 right-0 w-64 p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-cyan-500/50 transition-colors cursor-pointer"
        >
          <div className="w-full h-32 rounded-2xl bg-cyan-500/20 mb-4 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
          </div>
          <div className="h-4 w-3/4 bg-white/20 rounded-full mb-2" />
          <div className="h-4 w-1/2 bg-white/10 rounded-full" />
        </motion.div>
      </div>
    </section>

    {/* Featured Section */}
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Why Koddy?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Cpu />, title: "AI-Powered", desc: "Get instant help from our smart coding assistant." },
          { icon: <Globe />, title: "Modern Stack", desc: "Learn the latest technologies used by startups." },
          { icon: <Users />, title: "Community", desc: "Connect with thousands of other learners." }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/50">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const AuthPage = ({ type, onAuth, onBack }: { type: 'login' | 'signup', onAuth: (u: UserData, t: string) => void, onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const body = type === 'login' ? { email, password } : { name, email, password };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (res.ok) {
        onAuth(data.user, data.token);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10"
      >
        <button onClick={onBack} className="text-white/50 hover:text-white mb-8 flex items-center gap-2 text-sm">
          <ChevronRight className="rotate-180" size={16} /> Back to Home
        </button>
        
        <h2 className="text-3xl font-bold mb-2">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-white/50 mb-8">{type === 'login' ? 'Enter your details to continue' : 'Join the future of learning'}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <input 
              type="text" placeholder="Full Name" required
              value={name} onChange={e => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all"
            />
          )}
          <input 
            type="email" placeholder="Email Address" required
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all"
          />
          <input 
            type="password" placeholder="Password" required
            value={password} onChange={e => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all"
          />
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button 
            disabled={loading}
            className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ user, onSelectCourse, enrolledCourses }: { user: UserData | null, onSelectCourse: (c: Course) => void, enrolledCourses: string[] }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredCourses = COURSES.filter(c => 
    (category === 'All' || c.category === category) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user ? user.name : 'Guest'}!</h1>
        <p className="text-white/50">What would you like to learn today?</p>
      </div>

      {/* Featured Hero - New Interactive Element */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-64 md:h-80 rounded-[40px] overflow-hidden mb-12 group cursor-pointer"
        onClick={() => onSelectCourse(COURSES[3])} // AI with Python
      >
        <img src={COURSES[3].thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col justify-center p-8 md:p-12">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-4">
            <Sparkles size={16} />
            <span>FEATURED COURSE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-md">{COURSES[3].title}</h2>
          <p className="text-white/60 mb-6 max-w-sm hidden md:block">{COURSES[3].description}</p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-all">
              Enroll Now
            </button>
            <div className="flex items-center gap-2 text-white/70">
              <Users size={18} />
              <span className="text-sm font-medium">12k+ Students</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          <input 
            type="text" placeholder="Search for courses, instructors..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Python', 'JavaScript', 'Web Development', 'AI & Machine Learning', 'Data Science', 'App Development'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-4 rounded-2xl font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <motion.div 
            layout
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group cursor-pointer rounded-[32px] bg-white/5 border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold text-emerald-400 border border-emerald-500/30">
                {course.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-white/50 text-sm mb-4">{course.instructor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold">{course.rating}</span>
                  <span className="text-white/30 text-xs font-normal">({course.students.toLocaleString()})</span>
                </div>
                <div className="text-xl font-bold text-emerald-400">
                  {enrolledCourses.includes(course.id) ? 'Enrolled' : `₹${course.price}`}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CoursePage = ({ course, enrolled, onEnroll, onBack }: { course: Course, enrolled: boolean, onEnroll: () => void, onBack: () => void }) => (
  <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
    <button onClick={onBack} className="text-white/50 hover:text-white mb-8 flex items-center gap-2 text-sm">
      <ChevronRight className="rotate-180" size={16} /> Back to Courses
    </button>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-white/60 mb-8">{course.description}</p>
        
        <div className="flex items-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase font-bold tracking-wider">Instructor</p>
              <p className="font-bold">{course.instructor}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Star size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase font-bold tracking-wider">Rating</p>
              <p className="font-bold">{course.rating} / 5.0</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6">Curriculum</h3>
        <div className="space-y-4">
          {course.curriculum.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <span className="font-medium">{item}</span>
              <Play size={16} className="ml-auto text-white/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="sticky top-32 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="aspect-video rounded-2xl bg-black mb-6 overflow-hidden">
             <iframe 
              src={course.videoUrl} 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
          <div className="text-4xl font-bold mb-6">₹{course.price}</div>
          <button 
            onClick={onEnroll}
            className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 mb-4"
          >
            {enrolled ? 'Go to Course' : 'Enroll Now'}
          </button>
          <p className="text-center text-white/30 text-sm">30-Day Money-Back Guarantee</p>
        </div>
      </div>
    </div>
  </div>
);

const CoursePlayer = ({ course, onBack }: { course: Course, onBack: () => void }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleComplete = (idx: number) => {
    if (completed.includes(idx)) setCompleted(completed.filter(i => i !== idx));
    else setCompleted([...completed, idx]);
  };

  const progress = (completed.length / course.curriculum.length) * 100;

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col h-screen overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <button onClick={onBack} className="text-white/50 hover:text-white mb-4 flex items-center gap-2 text-sm">
            <ChevronRight className="rotate-180" size={16} /> Dashboard
          </button>
          <h2 className="font-bold text-lg mb-4">{course.title}</h2>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
          <p className="text-xs text-white/30 mt-2 font-bold uppercase tracking-wider">{Math.round(progress)}% Complete</p>
        </div>
        <div className="flex-1">
          {course.curriculum.map((item, i) => (
            <button 
              key={i}
              onClick={() => setCurrentLesson(i)}
              className={`w-full p-6 flex items-center gap-4 text-left border-b border-white/5 transition-all ${currentLesson === i ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500' : 'hover:bg-white/5'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${completed.includes(i) ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 text-white/30'}`}>
                {completed.includes(i) ? <CheckCircle size={14} /> : <span className="text-[10px]">{i + 1}</span>}
              </div>
              <span className={`text-sm font-medium ${currentLesson === i ? 'text-white' : 'text-white/50'}`}>{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Player */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-[40px] bg-black border border-white/10 overflow-hidden shadow-2xl mb-8">
            <iframe 
              src={course.videoUrl} 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.curriculum[currentLesson]}</h1>
              <p className="text-white/50">Lesson {currentLesson + 1} of {course.curriculum.length}</p>
            </div>
            <button 
              onClick={() => toggleComplete(currentLesson)}
              className={`px-8 py-4 rounded-2xl font-bold transition-all ${completed.includes(currentLesson) ? 'bg-white/10 text-white' : 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20'}`}
            >
              {completed.includes(currentLesson) ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="font-bold mb-4">About this lesson</h3>
            <p className="text-white/60 leading-relaxed">
              In this module, we'll dive deep into the core concepts of {course.curriculum[currentLesson]}. 
              Make sure to follow along with the code examples and practice in your own editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentModal = ({ course, onConfirm, onClose }: { course: Course, onConfirm: () => void, onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md p-8 rounded-[40px] bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden"
      >
        {step === 'form' ? (
          <>
            <h2 className="text-2xl font-bold mb-2">Complete Enrollment</h2>
            <p className="text-white/50 mb-8">Course: {course.title}</p>
            
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Cardholder Name</label>
                <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                  <input required type="text" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none" placeholder="0000 0000 0000 0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Expiry</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest">CVV</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none" placeholder="123" />
                </div>
              </div>
              <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all mt-4">
                Pay ₹{course.price}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-black mb-6"
            >
              <CheckCircle size={40} />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-white/50">Unlocking your course content...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: "Hi! I'm Koddy, your AI coding assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const aiResponse = await askKoddy(userMsg, history);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-emerald-500/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                  <Sparkles size={16} />
                </div>
                <span className="font-bold">Koddy Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-emerald-500 text-black font-medium' : 'bg-white/5 text-white/80 border border-white/10'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" placeholder="Ask a question..."
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500 outline-none"
                />
                <button onClick={handleSend} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-400">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-emerald-500 text-black shadow-2xl shadow-emerald-500/40 flex items-center justify-center hover:scale-110 transition-all active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('koddy_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      setPage('dashboard');
      fetchEnrollments(u.id);
    }
  }, []);

  const fetchEnrollments = async (userId: number) => {
    try {
      const res = await fetch(`/api/enrollments/${userId}`);
      const data = await res.json();
      setEnrolledCourses(data);
    } catch (err) {
      console.error("Failed to fetch enrollments");
    }
  };

  const handleAuth = (u: UserData, token: string) => {
    localStorage.setItem('koddy_user', JSON.stringify(u));
    localStorage.setItem('koddy_token', token);
    setUser(u);
    setPage('dashboard');
    fetchEnrollments(u.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('koddy_user');
    localStorage.removeItem('koddy_token');
    setUser(null);
    setPage('landing');
    setEnrolledCourses([]);
  };

  const handleEnroll = async () => {
    if (!user) {
      setPage('login');
      return;
    }
    if (enrolledCourses.includes(selectedCourse!.id)) {
      setPage('player');
      return;
    }
    setShowPayment(true);
  };

  const confirmEnrollment = async () => {
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user!.id, courseId: selectedCourse!.id })
      });
      if (res.ok) {
        setEnrolledCourses([...enrolledCourses, selectedCourse!.id]);
        setShowPayment(false);
        setPage('player');
      }
    } catch (err) {
      console.error("Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {page !== 'player' && <Navbar user={user} onLogout={handleLogout} setPage={setPage} />}
      
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onStart={(mode) => mode === 'guest' ? setPage('dashboard') : setPage(mode)} />
          </motion.div>
        )}
        
        {(page === 'login' || page === 'signup') && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AuthPage type={page as any} onAuth={handleAuth} onBack={() => setPage('landing')} />
          </motion.div>
        )}

        {page === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard 
              user={user} 
              enrolledCourses={enrolledCourses}
              onSelectCourse={(c) => { setSelectedCourse(c); setPage('course'); }} 
            />
          </motion.div>
        )}

        {page === 'course' && selectedCourse && (
          <motion.div key="course" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CoursePage 
              course={selectedCourse} 
              enrolled={enrolledCourses.includes(selectedCourse.id)}
              onEnroll={handleEnroll}
              onBack={() => setPage('dashboard')} 
            />
          </motion.div>
        )}

        {page === 'player' && selectedCourse && (
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CoursePlayer course={selectedCourse} onBack={() => setPage('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>

      <AIChat />

      <AnimatePresence>
        {showPayment && selectedCourse && (
          <PaymentModal 
            course={selectedCourse} 
            onConfirm={confirmEnrollment} 
            onClose={() => setShowPayment(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
