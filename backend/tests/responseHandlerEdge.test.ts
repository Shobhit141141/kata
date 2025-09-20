import { handleResponse } from '../src/utils/responseHandler.js';
import { Response } from 'express';

describe('handleResponse edge cases', () => {
  it('should handle missing data', () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    handleResponse(res as Response, 400, false, 'Error');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error',
      data: undefined,
    });
  });
});
