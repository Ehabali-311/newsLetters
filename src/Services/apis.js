
export const apiConfig = {
    getNews: {
      url: (lang) => `https://data.argaam.com/api/v1/json/newsletter/get-all-newsletters?langId=${lang === 'ar' ? 1 : 2}`,
      method: 'GET'
    },
    otpRequest: {
      url: (userEmail) => `https://data.argaam.com/api/v1/json/newsletter/request-otp?Email=${userEmail}`,
      method: 'GET'
    },
    getVerify: {
      url: ({ registerId , otpCode }) => `https://data.argaam.com/api/v1/json/newsletter/otp-verification?EmailVerificationCode=${otpCode}&RegitserVerificationID=${registerId}`,
      method: 'GET'
    },
    getSubscribed: {
      url: ({ user , lang}) => `https://data.argaam.com/api/v1/json/newsletter/get-user-subscriptions?userId=${user}&langId=${lang === 'ar' ? 1 : 2}`,
      method: 'GET'
    }
  };