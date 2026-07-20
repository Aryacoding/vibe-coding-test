import { Elysia, t } from 'elysia';
import { registerUser, loginUser, getCurrentUser } from '../services/user-services';

export const userRoute = new Elysia({ prefix: '/api' })
  .post(
    '/users',
    async ({ body, set }) => {
      try {
        const result = await registerUser(body);
        return result;
      } catch (error: any) {
        set.status = 400;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    '/users/login',
    async ({ body, set }) => {
      try {
        const result = await loginUser(body);
        return result;
      } catch (error: any) {
        set.status = 400;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get('/users/current', async ({ headers, set }) => {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unautorized');
      }
      
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new Error('Unautorized');
      }

      const result = await getCurrentUser(token);
      return { data: result };
    } catch (error: any) {
      set.status = 401;
      return { Error: 'Unautorized' };
    }
  });
