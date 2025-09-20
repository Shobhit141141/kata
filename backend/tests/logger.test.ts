import logger from '../src/utils/logger.js';

describe('logger', () => {
  it('should have info, error, debug methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });

  it('should log without throwing', () => {
    expect(() => logger.info('test info')).not.toThrow();
    expect(() => logger.error('test error')).not.toThrow();
    expect(() => logger.debug('test debug')).not.toThrow();
  });
});
