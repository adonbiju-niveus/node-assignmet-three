const request = require('supertest');
const app = require('../index'); // Assuming the code is part of an Express app
const User = require('../Models/user');

describe('User API', () => {
  let testUser;

  beforeAll(() => {
    // Set up a test user before running the tests
    testUser = {
      name: 'Test User',
      number: '1234567890',
      emailId: 'test@example.com',
    };
  });

  beforeEach(async () => {
    // Clear the users collection in the database before each test
    await User.deleteMany({});
  });
  
  /*---------------Create user:  POST /api/createUsers------------------*/
  describe('Post /api/createUsers', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/createUser')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'user created successfully');
      expect(response.body.data).toMatchObject(testUser);

    });

    it('should handle errors when creating a user', async () => {
      // Simulate an error during user creation
      jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const response = await request(app)
        .post('/api/createUser')
        .send(testUser);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to create user');
    });
  });
/*---------------Get All user:  GET /api/getAllUsers-----------------*/
  describe('Get /api/getAllUsers', () => {
    it('should get all users', async () => {
      await User.create(testUser);
      const response = await request(app).get('/api/getAllUsers');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'success');
    });

    it('should handle errors when getting all users', async () => {
      // Simulate an error during fetching users
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        throw new Error('Test error');
      });
      const response = await request(app).get('/api/getAllUsers');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to get users');
    });

    it('should return 404 if no users found', async () => {
      const response = await request(app).get('/api/getAllUsers');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'There is no user found');
    });
  });

/*---------------Update A user:  PUT /api//api/updateUser----------------*/
  describe('PUT /api/updateUser/:emailId', () => {
    it('should update a user', async () => {
      const existingUser = await User.create(testUser);

      const updatedUser = {
        name: 'Updated User',
        number: '9876543210',
        emailId: 'test@example.com',
      };

      const response = await request(app)
        .put(`/api/updateUser/${existingUser.emailId}`)
        .send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'user updated successfully');
      expect(response.body.data).toMatchObject(updatedUser);
    });

    it('should return 404 if no users found', async () => {
      const response = await request(app)
        .put('/api/updateUser/nonexistent@example.com')
        .send(testUser);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });

 
    it('should handle errors when updating a user', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Test error'));
      const existingUser = await User.create(testUser);
      const response = await request(app)
        .put(`/api/updateUser/${existingUser.emailId}`)
        .send(testUser);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to update a user');
    });

  });

});
