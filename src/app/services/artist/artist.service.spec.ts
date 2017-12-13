import { TestBed, inject } from '@angular/core/testing';

import { ArtistService } from './artist.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistService]
    });
  });

  it('should be created', inject([ArtistService], (service: ArtistService) => {
    expect(service).toBeTruthy();
  }));
});
