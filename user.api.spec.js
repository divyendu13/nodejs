const { test, expect } = require('@playwright/test');

test.describe("User CRUD operation test", () => {
    let newUserId;
    const testUser = { name: 'Fahad', email: 'fahad.fasil@playwright.com' };

    //1. Test POST
    test('should create a new user', async ({ request }) => {
        const response = await request.post('/users', {
            data: testUser,
        });

        //Assertions
        expect(response.status()).toBe(201);
        const body = await response.json()
        expect(body).toMatchObject(testUser);
        expect(body).toHaveProperty('id');
        newUserId = body.id; // Store the new ID for subsequent tests
    });

    //2. Test GET
    test('should read newly created user', async ({ request }) => {
        const response = await request.get(`/users/${newUserId}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.name).toBe(testUser.name)
    });

    // 3. Test PUT (Update)
    test('should update the user', async ({ request }) => {
        const updatedData = { email: 'Basil.Joseph@playwright.com' };
        const response = await request.put(`/users/${newUserId}`, {
            data: updatedData,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.email).toBe(updatedData.email);
        expect(body.name).toBe(testUser.name); // Name should be preserved
    });

    // 4. Test DELETE
    test('should delete the user', async ({ request }) => {
        const deleteResponse = await request.delete(`/users/${newUserId}`);
        expect(deleteResponse.status()).toBe(204);

        // Verification step (Read One should now fail)
        const getResponse = await request.get(`/users/${newUserId}`);
        expect(getResponse.status()).toBe(404);
    });
})

