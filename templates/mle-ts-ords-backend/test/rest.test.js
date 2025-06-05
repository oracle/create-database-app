import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:8080/ords/userc/users';
let createdUserId;

describe('ORDS User Endpoints', () => {
  it('should create a user (POST)', async () => {
    const res = await fetch(`${BASE_URL}/create?name=perry`, { method: 'POST' });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data).toHaveProperty('id');
    expect(typeof data.id).toBe('number');

    createdUserId = data.id;
    console.log('New user created with ID:', createdUserId);
  });

  it('should retrieve the created user (GET)', async () => {
    const res = await fetch(`${BASE_URL}/${createdUserId}`);
    expect(res.status).toBe(200);
    const user = await res.json();
    expect(user).toBe('perry');
    console.log('User:', user);
  });

  it('should update the user name (PUT)', async () => {
    const res = await fetch(`${BASE_URL}/edit/${createdUserId}?name=Katty`, {
      method: 'PUT'
    });

    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result).toHaveProperty('rowsUpdated', 1);
    console.log('User updated');
  });

  it('should confirm the user name was updated (GET)', async () => {
    const res = await fetch(`${BASE_URL}/${createdUserId}`);
    expect(res.status).toBe(200);
    const user = await res.json();
    expect(user).toBe('Katty');
    console.log('User:', user);
  });

  it('should delete the user (DELETE)', async () => {
    const res = await fetch(`${BASE_URL}/delete/${createdUserId}`, { method: 'DELETE' });
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result).toHaveProperty('rowsDeleted', 1);
    console.log('User deleted');
  });

  it('should not find deleted user (GET)', async () => {
    const res = await fetch(`${BASE_URL}/${createdUserId}`);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result).toHaveProperty('msg', 'User not found');
  });
});