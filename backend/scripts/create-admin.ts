import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import * as readline from 'readline';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  try {
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    const name = await question('Enter admin name: ');

    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.log('User already exists. Making admin...');
      await usersService.makeAdmin(existingUser._id.toString());
      console.log('User is now an admin!');
    } else {
      await usersService.create(email, password, name, true);
      console.log('Admin user created successfully!');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    rl.close();
    await app.close();
  }
}

createAdmin();

