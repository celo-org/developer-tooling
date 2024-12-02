import { CustomFlags } from './command'

describe('CustomFlags.url', () => {
  it('should return the input if it is a valid URL', async () => {
    const flag = CustomFlags.url({
      required: true,
      description: 'Test URL',
    })

    await expect(
      flag.parse('https://example.com', {} as any, {} as any)
    ).resolves.toMatchInlineSnapshot(`"https://example.com"`)
  })

  it('should throw an error if the input is not a valid URL', async () => {
    const flag = CustomFlags.url({
      required: true,
      description: 'Test URL',
    })

    await expect(
      flag.parse('invalid', {} as any, {} as any)
    ).rejects.toThrowErrorMatchingInlineSnapshot(`""invalid" is not a valid URL"`)
  })

  it('should throw an error if the input is a localhost URL', async () => {
    const flag = CustomFlags.url({
      required: true,
      description: 'Test URL',
    })

    await expect(
      flag.parse('http://localhost:8545', {} as any, {} as any)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Provided URL is a localhost address. Please provide a public URL."`
    )
    await expect(() =>
      flag.parse('http://127.0.0.1/path', {} as any, {} as any)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Provided URL is a localhost address. Please provide a public URL."`
    )
  })
})
