const request = require('supertest');
const app = require('../index');

describe('Comments API', () => {
    describe('Health Check', () => {
        test('GET /health should return healthy status', async () => {
            const response = await request(app).get('/health');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('healthy');
            expect(response.body.service).toBe('flask-comments-api-node');
            expect(response.body.timestamp).toBeDefined();
        });
    });

    describe('Home endpoint', () => {
        test('GET / should return API information', async () => {
            const response = await request(app).get('/');

            expect(response.status).toBe(200);
            expect(response.body.message).toContain('Flask Comments API');
            expect(response.body.version).toBe('1.0.0');
            expect(response.body.endpoints).toBeDefined();
        });
    });

    describe('Comments CRUD', () => {
        let commentId;

        test('GET /api/comments should return empty array initially', async () => {
            const response = await request(app).get('/api/comments');

            expect(response.status).toBe(200);
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.total).toBeDefined();
        });

        test('POST /api/comments should create a new comment', async () => {
            const newComment = {
                author: 'Test User',
                content: 'This is a test comment',
            };

            const response = await request(app)
                .post('/api/comments')
                .send(newComment);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Comment created successfully');
            expect(response.body.data).toBeDefined();
            expect(response.body.data.author).toBe(newComment.author);
            expect(response.body.data.content).toBe(newComment.content);
            expect(response.body.data.id).toBeDefined();

            commentId = response.body.data.id;
        });

        test('POST /api/comments should reject invalid data', async () => {
            //Test missing author
            let response = await request(app)
                .post('/api/comments')
                .send({ content: 'Test content' });
            expect(response.status).toBe(400);

            //Test missing content
            response = await request(app)
                .post('/api/comments')
                .send({ author: 'Test Author' });
            expect(response.status).toBe(400);

            //Test empty strings
            response = await request(app)
                .post('/api/comments')
                .send({ author: '', content: '' });
            expect(response.status).toBe(400);
        });

        test('GET /api/comments/:id should return specific comment', async () => {
            const response = await request(app).get(
                `/api/comments/${commentId}`
            );

            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe(commentId);
        });

        test('GET /api/comments/:id should return 404 for non-existent comment', async () => {
            const response = await request(app).get('/api/comments/999999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Not found');
        });

        test('GET /api/comments/:id should return 400 for invalid ID', async () => {
            const response = await request(app).get('/api/comments/invalid-id');

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Validation error');
        });

        test('DELETE /api/comments/:id should delete comment', async () => {
            const response = await request(app).delete(
                `/api/comments/${commentId}`
            );

            expect(response.status).toBe(200);
            expect(response.body.message).toContain('deleted successfully');

            //Verify comment is deleted
            const getResponse = await request(app).get(
                `/api/comments/${commentId}`
            );
            expect(getResponse.status).toBe(404);
        });

        test('DELETE /api/comments/:id should return 404 for non-existent comment', async () => {
            const response = await request(app).delete('/api/comments/999999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Not found');
        });
    });

    describe('API Documentation', () => {
        test('GET /api/docs should return API documentation', async () => {
            const response = await request(app).get('/api/docs');

            expect(response.status).toBe(200);
            expect(response.body.title).toContain('Comments API Documentation');
            expect(response.body.endpoints).toBeInstanceOf(Array);
        });
    });

    describe('Error Handling', () => {
        test('Should return 404 for non-existent routes', async () => {
            const response = await request(app).get('/non-existent-route');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Route not found');
        });
    });
});

module.exports = app;
