import {postRequestBody, putRequestBody} from '../../fixtures/testData.json'

describe('API sturdents', () => {
  let newStudentId;
 it('Retrieve all students and validate the response', () => {
      cy.request({
        method: 'GET',
   
      }).then((response) => {
        expect(response.status).to.eq(200)
        console.log(JSON.stringify(response.body))
        expect(response.body).to.have.length.gte(2)
        response.body.forEach((student) => {
          expect(student).to.have.property('STUDENT_ID')
        })
      })
    })
    it('Should create a new student and validate response', () => {
      // const postRequestBody = {
      //   FIRST_NAME: 'Damir',
      //   LAST_NAME: 'Lozan',
      //   DOB: '2017-01-01',
      //   EMAIL: 'damir@example.com',
      //   INSTRUCTOR_ID: 3
      // }
    
      cy.request({
        method: 'POST',
        url: `https://api.tech-global-training.com/students`,
        body: postRequestBody,
        }).then((response) => {
        expect(response.status).to.eq(201); 
        expect(response.body.STUDENT_ID).to.be.greaterThan(2) 
        expect(response.body.DOB).to.eq(postRequestBody.DOB)
        expect(response.body.EMAIL).to.eq(postRequestBody.EMAIL)
        expect(response.body.FIRST_NAME).to.eq(postRequestBody.FIRST_NAME) 
        expect(response.body.LAST_NAME).to.eq(postRequestBody.LAST_NAME) 
        expect(response.body.INSTRUCTOR_ID).to.eq(postRequestBody.INSTRUCTOR_ID)
  
     newStudentId = response.body.STUDENT_ID;
      })
    })
    it('Retrieve the newly created student and validate the response', () => {
      cy.request({
        method: 'GET',
        url: `https://api.tech-global-training.com/students/${newStudentId}`,
    }).then((response) => {
      expect(response.status).to.eq(200); 
        expect(response.body.STUDENT_ID).to.be.eq(newStudentId)
        expect(response.body.DOB.split('T')[0]).to.eq(postRequestBody.DOB)
        expect(response.body.EMAIL).to.eq(postRequestBody.EMAIL)
        expect(response.body.FIRST_NAME).to.eq(postRequestBody.FIRST_NAME) 
        expect(response.body.LAST_NAME).to.eq(postRequestBody.LAST_NAME) 
        expect(response.body.INSTRUCTOR_ID).to.eq(postRequestBody.INSTRUCTOR_ID)
  })
    })
    it('Update the newly created student with a different instructor and validate the response', () => {
     cy.request({
        method: 'PUT',
        url: `https://api.tech-global-training.com/students/${newStudentId}`,
        body: putRequestBody,
         }).then((response) =>{
          expect(response.status).to.eq(200)
          expect(response.body).to.include(`Successfully updated ${putRequestBody.FIRST_NAME}`)
          console.log(JSON.stringify(response.body))
        })
    })
     it('Delete the newly created student and validate the response', () => {
      cy.request({
        method: 'DELETE',
         url: `https://api.tech-global-training.com/students/${newStudentId}`,
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message').to.eq(`Successfully deleted user with Id: ${newStudentId}`)
        })
    })
   })