export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  videoUrl: string;
  category: string;
  curriculum: string[];
}

export const COURSES: Course[] = [
  {
    id: "python-beginners",
    title: "Python for Beginners",
    instructor: "Dr. Angela Yu",
    description: "Master Python by building 100 projects in 100 days. Learn data science, automation, and game development.",
    price: 49.99,
    rating: 4.8,
    students: 15420,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    category: "Python",
    curriculum: ["Introduction to Python", "Variables and Data Types", "Control Flow", "Functions and Modules", "File I/O"]
  },
  {
    id: "js-mastery",
    title: "JavaScript Mastery",
    instructor: "Jonas Schmedtmann",
    description: "The most complete JavaScript course on the market. From beginner to advanced, including ES6+, OOP, and more.",
    price: 59.99,
    rating: 4.9,
    students: 22150,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
    category: "JavaScript",
    curriculum: ["JavaScript Fundamentals", "DOM Manipulation", "Asynchronous JS", "Modern Tooling", "Final Project"]
  },
  {
    id: "react-bootcamp",
    title: "React Bootcamp",
    instructor: "Maximilian Schwarzmüller",
    description: "Dive deep into React.js. Learn Hooks, Redux, React Router, and Next.js from scratch.",
    price: 69.99,
    rating: 4.7,
    students: 18900,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
    category: "Web Development",
    curriculum: ["React Basics", "State and Props", "Hooks Deep Dive", "Routing", "Deployment"]
  },
  {
    id: "ai-python",
    title: "AI with Python",
    instructor: "Andrew Ng",
    description: "Learn the fundamentals of Artificial Intelligence and Machine Learning using Python and TensorFlow.",
    price: 89.99,
    rating: 4.9,
    students: 12300,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/JMUxmLgwEk8",
    category: "AI & Machine Learning",
    curriculum: ["Introduction to AI", "Neural Networks", "Computer Vision", "NLP", "AI Ethics"]
  },
  {
    id: "data-science-fundamentals",
    title: "Data Science Fundamentals",
    instructor: "Kirill Eremenko",
    description: "Learn the entire Data Science pipeline: Data Mining, Analysis, Visualization, and Modeling.",
    price: 54.99,
    rating: 4.6,
    students: 9800,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
    category: "Data Science",
    curriculum: ["Statistics for DS", "Pandas and NumPy", "Data Visualization", "Machine Learning Intro", "Real-world Case Studies"]
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Development",
    instructor: "Colt Steele",
    description: "Become a full-stack developer. Learn HTML, CSS, JS, Node, Express, and MongoDB.",
    price: 79.99,
    rating: 4.8,
    students: 31000,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/zJSY8tJY_67",
    category: "App Development",
    curriculum: ["Frontend Mastery", "Backend with Node", "Databases", "Authentication", "Full Stack Project"]
  }
];
