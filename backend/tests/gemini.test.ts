import { getGeminiResponse } from '../src/services/gemini.js';

jest.mock('@google/genai', () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(({ apiKey }) => ({
      models: {
        generateContent: jest.fn().mockImplementation(({ model, contents }) => {
          if (!apiKey) {
            throw new Error('API key missing');
          }
          return Promise.resolve({
            candidates: [
              {
                content: {
                  parts: [{ text: 'Mocked Gemini response.' }],
                },
              },
            ],
          });
        }),
      },
    })),
  };
});

const ORIGINAL_CONSTANTS = { ...require('../src/config/constants.js').CONSTANTS };

describe('getGeminiResponse', () => {
  afterEach(() => {
    // Restore original CONSTANTS after each test
    require('../src/config/constants.js').CONSTANTS.GEMINI_API_KEY = ORIGINAL_CONSTANTS.GEMINI_API_KEY;
    jest.clearAllMocks();
  });

  it('should return a string response', async () => {
    require('../src/config/constants.js').CONSTANTS.GEMINI_API_KEY = 'dummy-key';
    const response = await getGeminiResponse([
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ]);
    expect(typeof response).toBe('string');
    expect(response).toBe('Mocked Gemini response.');
  });

  it('should fail if API key is missing', async () => {
    require('../src/config/constants.js').CONSTANTS.GEMINI_API_KEY = '';
    await expect(
      getGeminiResponse([
        { role: 'user', content: 'hi' },
        { role: 'assistant', content: 'hello' },
      ]),
    ).rejects.toThrow('API key missing');
  });

  it('should return "No response." if candidates are missing', async () => {
    (require('@google/genai').GoogleGenAI as any).mockImplementationOnce(() => ({
      models: {
        generateContent: jest.fn().mockResolvedValue({}),
      },
    }));
    require('../src/config/constants.js').CONSTANTS.GEMINI_API_KEY = 'dummy-key';
    const response = await getGeminiResponse([
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ]);
    expect(response).toBe('No response.');
  });

  it('should handle messages with different roles', async () => {
    require('../src/config/constants.js').CONSTANTS.GEMINI_API_KEY = 'dummy-key';
    const response = await getGeminiResponse([
      { role: 'system', content: 'system prompt' },
      { role: 'user', content: 'user prompt' },
    ]);
    expect(response).toBe('Mocked Gemini response.');
  });
});
