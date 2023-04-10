/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // your code here
  return fetcher().catch((err) => {
    if (maximumRetryCount <= 0) {
      throw err;
    }
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  });
}
