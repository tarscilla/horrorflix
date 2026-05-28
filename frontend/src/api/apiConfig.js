const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "f78180d5f120c3c41cfd9040a8e57487",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
