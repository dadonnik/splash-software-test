import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMongoConfigModule } from './configuration.module';
import { DatabaseMongoConfigService } from './configuration.service';

jest.mock('dotenv');
jest.mock('fs');

describe('DatabaseMongoConfigService', () => {
  let service: DatabaseMongoConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DatabaseMongoConfigModule],
    }).compile();

    service = moduleRef.get<DatabaseMongoConfigService>(
      DatabaseMongoConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return connection uri', () => {
    expect(service.uri).not.toBeNull();
  });
});
