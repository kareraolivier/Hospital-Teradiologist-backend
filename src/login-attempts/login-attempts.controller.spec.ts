import { Test, TestingModule } from '@nestjs/testing';
import { LoginAttemptsController } from './login-attempts.controller';
import { LoginAttemptsService } from './login-attempts.service';

describe('LoginAttemptsController', () => {
  let controller: LoginAttemptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginAttemptsController],
      providers: [LoginAttemptsService],
    }).compile();

    controller = module.get<LoginAttemptsController>(LoginAttemptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
