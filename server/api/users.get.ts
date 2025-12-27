import type { User } from '../../types/user'

export default defineEventHandler(() => {
  const users: User[] = [
    { id: 1, name: 'Panha Nhean4', email: 'panha@gmail.com', password: '123456' },
    { id: 2, name: 'Panha Nhean3', email: 'panhatest@gmail.com', password: '123456' },
    { id: 3, name: 'Panha Nhean2', email: 'panhates123@gmail.com', password: '123456' },
    { id: 4, name: 'Panha Nhean1', email: 'panha1231@gmail.com', password: '123456' },
  ]
  return users
})
