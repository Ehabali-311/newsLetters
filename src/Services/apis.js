
export const apiConfig = {
    getNews: {
      url: (lang) => `https://data.argaam.com/api/v1/json/newsletter/get-all-newsletters?langId=${lang === 'ar' ? 1 : 2}`,
      method: 'GET'
    }
  };
  