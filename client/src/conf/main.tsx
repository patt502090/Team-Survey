const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  urlPrefix: "http://localhost:1337",
  loginEndpoint: "/auth/local",
  registerEndpoint: "/auth/local/register",
  jwtUserEndpoint:
    "/users/me?populate=role",
  jwtSessionStorageKey: "auth.jwt",
  roleSessionStorageKey: "auth.role",
  googleConnectEndpoint: "/connect/google",
  memberStorageKey:
    "tugenQcH(!o^he75LFHbX%tn70kJ;.q,~=}uuI1l7BGY_iVF3Hs,/d|EUNUL)KD",
  adminStorageKey:
    "=hru*(kh=+C/2o%{s2S[]aNkLmda)S&,!//BSr_Q<Ug:RwOUp%^pJO*@e`1n<v(",
};

export default conf;
