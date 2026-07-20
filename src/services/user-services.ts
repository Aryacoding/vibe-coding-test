import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { users, sessions } from '../db/schema';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function registerUser(payload: any) {
  const { name, email, password } = payload;

  // Cek apakah email sudah terdaftar
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw new Error('email sudah terdaftar');
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Insert ke database
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { data: 'ok' };
}

export async function loginUser(payload: any) {
  const { email, password } = payload;

  // Cari user berdasarkan email
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  const user = existingUser[0];
  if (!user) {
    throw new Error('email atau password salah');
  }

  // Verifikasi password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error('email atau password salah');
  }

  // Generate token
  const token = crypto.randomUUID();

  // Simpan token ke database sessions
  await db.insert(sessions).values({
    token,
    userId: user.id,
  });

  return { data: token };
}

export async function getCurrentUser(token: string) {
  // Cari session berdasarkan token
  const sessionRecord = await db.select().from(sessions).where(eq(sessions.token, token));
  const session = sessionRecord[0];
  if (!session) {
    throw new Error('Unautorized');
  }

  const userId = session.userId;
  if (!userId) {
    throw new Error('Unautorized');
  }

  // Cari user berdasarkan userId
  const userRecord = await db.select().from(users).where(eq(users.id, userId));
  const user = userRecord[0];
  if (!user) {
    throw new Error('Unautorized');
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  };
}

export async function logoutUser(token: string) {
  // Cari session berdasarkan token
  const sessionRecord = await db.select().from(sessions).where(eq(sessions.token, token));
  const session = sessionRecord[0];
  if (!session) {
    throw new Error('Unautorized');
  }

  // Delete session
  await db.delete(sessions).where(eq(sessions.token, token));
}
