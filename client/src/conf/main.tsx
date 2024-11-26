const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  urlPrefix: "http://localhost:1337",
  loginEndpoint: "/auth/local",
  registerEndpoint: "/auth/local/register",
  jwtUserEndpoint: "/users/me?populate=*",
  jwtSessionStorageKey: "auth.jwt",
  roleSessionStorageKey: "auth.role",
  googleConnectEndpoint: "/connect/google",
  workerStorageKey:
    "tugenQcH(!o^he75LFHbX%tn70kJ;.q,~=}uuI1l7BGY_iVF3Hs,/d|EUNUL)KD",
  adminStorageKey:
    "=hru*(kh=+C/2o%{s2S[]aNkLmda)S&,!//BSr_Q<Ug:RwOUp%^pJO*@e`1n<v(",
  leaderStorageKey:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
  authorizedStorageKey:
    "kR7]u%NYw<:KzVm4Q&_1x#o~dJ^LcH/{+>A8)2@=B`Up!s[C*O,aS`r(p%&e>`",

  teamEndpoint: "/teams?populate=*&sort[0]=createdAt:desc",
  apiAiforthai: "https://api.aiforthai.in.th/ocr-id-front-iapp",
  apiKeyforAiforthai: "YH1mYYlQFqKa1VcAUEB0zAxTDhXDk98A",
};

export default conf;
