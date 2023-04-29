import { PhotoDto } from '../../../frontend/src/store/photo/types/photos.model';

describe('Photos', () => {
  beforeEach(() => {
    cy.visit('/photos');
    cy.clearLocalStorage();
  });

  it('should show all photos with the correct links', () => {
    cy.intercept('GET', '**/photos?**', { fixture: 'photos.json' });

    cy.fixture('photos.json').then((photos: PhotoDto[]) => {
      cy.get('mat-card').should('have.length', photos.length);
      cy.get('.image-link').each(($el) => {
        // check if element href is in photos array
        expect($el.attr('href')).to.be.oneOf(
          photos.map((p) => `/photos/${p.id}`)
        );
      });
    });
  });

  it('should navigate to photo detail page', () => {
    cy.intercept('GET', '**/photos?**', { fixture: 'photos.json' });
    cy.intercept('GET', '**/photos/**', { fixture: 'photo.json' });

    cy.get('img').first().click();
    cy.url().should('include', '/photos/');
  });
});
