import { MainFrameModule } from './main-frame.module';

describe('MainFrameModule', () => {
  let mainFrameModule: MainFrameModule;

  beforeEach(() => {
    mainFrameModule = new MainFrameModule();
  });

  it('should create an instance', () => {
    expect(mainFrameModule).toBeTruthy();
  });
});
