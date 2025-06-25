import { beforeEach, afterEach, describe, it, expect } from 'vitest';

const BASE_URL = 'http://<%= ordsHost %>:<%= ordsPort %>/ords/<%= connectionUsername %>';
let createdUserId;
let skipCleanup = false;


beforeEach(async () => {
  skipCleanup = false;
  const res = await fetch(`${BASE_URL}/create?name=perry`, { method: 'POST' });
  const data = await res.json();
  createdUserId = data.id;
});

afterEach(async () => {
  if (!skipCleanup) {
    await fetch(`${BASE_URL}/delete/${createdUserId}`, { method: 'DELETE' });
  }
});

describe('ORDS User Endpoints', () => {
  it('should create a user (POST)', async () => {
    expect(createdUserId).toBeDefined();
    expect(typeof createdUserId).toBe('number');
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

    //should confirm the user name was updated (GET)
    const res1 = await fetch(`${BASE_URL}/${createdUserId}`);
    expect(res1.status).toBe(200);
    const user = await res1.json();
    expect(user).toBe('Katty');
    console.log('User:', user);
  });
  
  it('should delete the user (DELETE)', async () => {
    const res = await fetch(`${BASE_URL}/delete/${createdUserId}`, { method: 'DELETE' });
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result).toHaveProperty('rowsDeleted', 1);
    console.log('User deleted');

    //should not find deleted user (GET)
    const res1 = await fetch(`${BASE_URL}/${createdUserId}`);
    expect(res1.status).toBe(404);
    const result1 = await res1.json();
    expect(result1).toHaveProperty('msg', 'User not found');

    skipCleanup = true;
  });
});