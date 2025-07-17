import { beforeEach, afterEach, describe, it, expect } from 'vitest';

const BASE_URL = '<%= ordsHost %>/<%= connectionUsername %>';
let createdUserId;
let skipCleanup = false;


beforeEach(async () => {
  skipCleanup = false;
  const res = await fetch(`${BASE_URL}/users?name=perry`, { method: 'POST' });
  const data = await res.json();
  createdUserId = data.id;
});

afterEach(async () => {
  if (!skipCleanup) {
    await fetch(`${BASE_URL}/users/${createdUserId}`, { method: 'DELETE' });
  }
});

describe('ORDS User Endpoints', () => {
  it('should create a user (POST)', async () => {
    expect(createdUserId).toBeDefined();
    expect(typeof createdUserId).toBe('number');
  });

  it('should retrieve the created user (GET)', async () => {
    const res = await fetch(`${BASE_URL}/users/${createdUserId}`);
    expect(res.status).toBe(200);
    const user = await res.json();
    expect(user).toBe('perry');
    console.log('User:', user);
  });

  it('should retrieve all created users (GET)', async () => {
    const res = await fetch(`${BASE_URL}/users?name=perry`, { method: 'POST' });
    const data = await res.json();
    expect(data.id).toBeDefined();
    expect(typeof data.id).toBe('number');

    const res1 = await fetch(`${BASE_URL}/users?name=perry1`, { method: 'POST' });
    const data1 = await res1.json();
    expect(data1.id).toBeDefined();
    expect(typeof data1.id).toBe('number');

    const res2 = await fetch(`${BASE_URL}/users`);
    expect(res2.status).toBe(200);
    const users = await res2.json();
    const names = users.map((u) => u.NAME);
    const ids = users.map((u) => u.ID);
    expect(names).toContain('perry');
    expect(names).toContain('perry1');
    expect(ids).toContain(data1.id);
    expect(ids).toContain(data.id);
    

    const res3 = await fetch(`${BASE_URL}/users/${data.id}`, { method: 'DELETE' });
    expect(res3.status).toBe(200);
    const result3 = await res3.json();
    expect(result3).toHaveProperty('rowsDeleted', 1);

    const res4 = await fetch(`${BASE_URL}/users/${data1.id}`, { method: 'DELETE' });
    expect(res4.status).toBe(200);
    const result4 = await res4.json();
    expect(result4).toHaveProperty('rowsDeleted', 1);
  });

  it('should update the user name (PUT)', async () => {
    const res = await fetch(`${BASE_URL}/users/${createdUserId}?name=Katty`, {
      method: 'PUT'
    });

    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result).toHaveProperty('rowsUpdated', 1);
    console.log('User updated');

    //should confirm the user name was updated (GET)
    const res1 = await fetch(`${BASE_URL}/users/${createdUserId}`);
    expect(res1.status).toBe(200);
    const user = await res1.json();
    expect(user).toBe('Katty');
    console.log('User:', user);
  });
  
  it('should delete the user (DELETE)', async () => {
    const res = await fetch(`${BASE_URL}/users/${createdUserId}`, { method: 'DELETE' });
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result).toHaveProperty('rowsDeleted', 1);
    console.log('User deleted');

    //should not find deleted user (GET)
    const res1 = await fetch(`${BASE_URL}/users/${createdUserId}`);
    expect(res1.status).toBe(404);
    const result1 = await res1.json();
    expect(result1).toHaveProperty('msg', 'User not found');

    skipCleanup = true;
  });
});