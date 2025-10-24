const { test, expect } = require('@playwright/test');

test.describe("User CRUD operation test" , () => {
    let newUserId;
    const testUser = { name: 'Fahad', email: 'fahad.fasil@playwright.com' };

    //1. Test POST
    test('should create a new user', async({ request }) =>{
        const response = await request.post('/users',{
            data: testUser,
        });

        //Assertions
        expect(response.status()).toBe(201);
        const body = await response.json()
        expect(body).toMatchObject(testUser);
        expect(body).toHaveProperty('id');
        newUserId = body.id; // Store the new ID for subsequent tests
    })
})

