import { handleResponse } from '../src/utils/responseHandler.js';
import { Response } from 'express';

describe('handleResponse', () => {
  it('should send correct response structure', () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    handleResponse(res as Response, 200, true, 'Success', { foo: 'bar' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Success',
      data: { foo: 'bar' },
    });
  });
});
