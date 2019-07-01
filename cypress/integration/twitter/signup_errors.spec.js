context('Twitter Signup Errors', () => {
  beforeEach(() => {
    cy
      .visit('https://twitter.com/signup')
      .title()
      .should('include', 'Sign up')
  })

  it('should clip input at the end if more than 50 characters are input for the name', () => {
    cy
      .get('input[name="name"]')
      .type('this is a really long name with 52 characters in it.')
      .get('input[name="name"]')
      .should(input => {
        expect(input.val()).to.have.length(50)
      })
      .get('input[name="name"]')
      .should('have.value', 'this is a really long name with 52 characters in i')
  });

  it('should throw an error if phone number is invalid', () => {
    cy
      .get('input[name="name"]')
      .type('an amazing name')
      .get('input[name="phone_number"]')
      .type('555-555-5555')
      .wait(1000)
      .get('body')
      .should('contain', 'Please enter a valid phone number.')
  });

  it('should not allow you to signup if you are not old enough', () => {
    cy
      .get('input[name="name"]')
      .type('A great name')
      .get('input[name="phone_number"]')
      .type('678-458-1981')
      .get('select[aria-label="Month"]')
      .select('January')
      .get('select[aria-label="Day"]')
      .select('1')
      .get('select[aria-label="Year"]')
      .select('2015')
      .get('div[aria-labelledby="modal-header"] div[role="button"]')
      .first()
      .click()
      
    cy
      .contains('Sign up')
      .click()

    cy
      .contains(`Can't complete your signup right now.`)
  })
})
