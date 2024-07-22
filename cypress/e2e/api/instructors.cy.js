describe('API Tests', () => {
  let newStudentId;
  it('Retrieve all instructors and validate the response', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.tech-global-training.com/instructors',
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.lengthOf(4)
      response.body.forEach((instructor) => {
        expect(instructor).to.have.property('INSTRUCTOR_ID')
        expect(instructor).to.have.property('FULLNAME')
        expect(instructor.STUDENTS).to.be.an('array')
      })
      const expectedIds = [1, 2, 3, 4];
      response.body.forEach((instructor, index) => {
        expect(instructor.INSTRUCTOR_ID).to.eq(expectedIds[index]);
      })
    })
  });


  it('Retrieve a single instructor and validate the response', () => {
    const instructorId = 1;

    cy.request({
      method: 'GET',
      url: `https://api.tech-global-training.com/instructors/${instructorId}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.INSTRUCTOR_ID).to.eq(instructorId)
      expect(response.body).to.have.property('FULLNAME');
      expect(response.body).to.have.property('STUDENTS');
      expect(response.body.STUDENTS).to.be.an('array');
    })
  });


  it('Create a new student and validate its association with the instructor, then delete', () => {
const instructorId = 3;

const newStudent = {
      FIRST_NAME: 'Damir',
      LAST_NAME: 'Lozan',
      DOB: '2017-01-01',
      EMAIL: 'damir@example.com',
      INSTRUCTOR_ID: instructorId
    };
    
    cy.request({
      method: 'POST',
      url: 'https://api.tech-global-training.com/students',
      body: newStudent,
    }).then((response) => {
      expect(response.status).to.eq(201);
      newStudentId = response.body.STUDENT_ID;

     cy.request({
        method: 'GET',
        url: `https://api.tech-global-training.com/instructors/${instructorId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        
        const hasStudent = response.body.STUDENTS.some(student => student.STUDENT_ID === newStudentId);
        expect(hasStudent).to.be.true;
        
        
       
cy.request({
          method: 'DELETE',
          url: `https://api.tech-global-training.com/students/${newStudentId}`,
        }).then((response) => {
          expect(response.status).to.eq(204);
        })
      })
    })
    })
  })
