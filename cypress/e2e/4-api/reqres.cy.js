describe('API Testing', () => {

    it('Create user', () =>{
        cy.request('POST', 'https://reqres.in/api/users', {
            "name": "morpheus",
            "job": "leader"
        }).then(
            (response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', 'morpheus')
                expect(response.body).to.have.property('job', 'leader')
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('createdAt')
            }
        )
    });

    it('GET user', () =>{
        cy.request('GET', 'https://reqres.in/api/users/1').then(
            (response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body).to.have.property('data').contain({
                    "id": 1,
                    "email": "george.bluth@reqres.in",
                    "first_name": "George",
                    "last_name": "Bluth",
                    "avatar": "https://reqres.in/img/faces/1-image.jpg"
                })
                expect(response.body).to.have.property('support')
                expect(response.body).to.have.property('support').contain({
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                })
            }
        )
    });
});