import config from './app/config';
import app from './app';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
