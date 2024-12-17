import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

// Connect to MongoDB and handle errors
mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });


  //User schema
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],  // Role can be admin, teacher, or student
      default: 'student'  // Default role is student
    },
    
    oauthId: {
      type: String,  // OAuth ID from the authentication provider (Google, GitHub, etc.)
      required: true
    }

  });






  //course schema

  const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Refers to a Teacher (User)
      required: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'  // Array of students (User references)
    }],
    lectures: [{
      title: String,
      content: String,  // Could be a URL to the lecture material (slides, videos, etc.)
      date: {
        type: Date,
        required: true
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });



 const User = mongoose.model('User', userSchema);
 const Course = mongoose.model('Course', courseSchema);


 module.exports = { User, Course };


  




  


    




