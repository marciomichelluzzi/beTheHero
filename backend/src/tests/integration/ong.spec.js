const request = require('supertest');
const app = require("../../app");
const connection = require("../../database/connection");

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => { await connection.destroy(); });

    it('should be able to create a new ONG', async () => {

        const response = await request(app).post('/ongs').send({
            name: "Sítio Dona Lúcia",
            email: "email@email.com",
            whatsapp: "47000000 0",
            city: "Blumenau",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        console.log(response.body);
    });
});