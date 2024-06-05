import cors from 'cors';

export const corsMiddleware=()=>cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'https://edukids-1.vercel.app/',
        'http://localhost:1234',
        'http://localhost:5173'
      ];
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
  
      if (!origin) {
        return callback(null, true);
      }
  
      return callback(new Error('Not allowed by CORS'));
    }
  })