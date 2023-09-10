import app from './server';

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
}

