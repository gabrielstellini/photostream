import { PhotoDto } from '../../../frontend/src/store/photo/types/photos.model';
import { BackendUrls } from '../../../frontend/src/statics/backendUrls.static';

describe('Favourites', () => {
  beforeEach(() => {
    cy.visit('/photos');
    cy.clearLocalStorage();
  });

  it('should add item to favourites, and persist the changes after a refresh', () => {
    cy.fixture('photo.json').then((photo: PhotoDto) => {
      cy.intercept('GET', `${BackendUrls.photo(photo.id)}**`, {
        fixture: 'photo.json',
      });
      cy.visit(`photos/${photo.id}`);
    });
    cy.contains('Add to favourites').click();
    cy.contains('Remove from favourites').should('exist');
    cy.reload();
    cy.contains('Remove from favourites').should('exist');
  });

  it.only('should view favourites in favourites page', () => {
    cy.fixture('photo.json').then((photo: PhotoDto) => {
      cy.intercept('GET', `${BackendUrls.photo(photo.id)}**`, {
        fixture: 'photo.json',
      });
      cy.visit(`photos/${photo.id}`);
      cy.wrap(photo).as('photo');
    });
    cy.contains('Add to favourites').click();

    cy.get<PhotoDto>('@photo').then((photo) => {
      cy.intercept('GET', '**/photos?**', (req) => {
        expect(req.url).to.include(`id=${photo.id}`);
      });
    });

    cy.visit('/favourites');
  });
});
