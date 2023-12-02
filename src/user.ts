import { db } from './firebase';

type User = {
  first: string;
  last: string;
  born: number;
};

export const getUser = async (id: string) => {
  const docRef = db.collection('users').doc(id);
  const snapshot = await docRef.get();
  return snapshot.data();
};

export const addUser = async (user: User) => {
  const docRef = db.collection('users');
  const result = await docRef.add(user);
  return result.id;
};

export const updateUser = async ({
  id,
  first,
  last,
  born,
}: User & { id: string }) => {
  const docRef = db.collection('users').doc(id);
  await docRef.update({ first, last, born });
  return { id, first, last, born };
};

export const deleteUser = async (id: string) => {
  const docRef = db.collection('users').doc(id);
  const deletedUser = await docRef.get();
  await docRef.delete();
  return deletedUser.data();
};
