
export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "real-estate-session",
  ttl: 200,
  proxy: true,
  cookieOptions: {
    httpOnly: true,
<<<<<<< HEAD
    secure: true,
=======
    // secure: true,
>>>>>>> daf67d48d60c20783afdd49c4bc5599f4e99a891
    maxAge: undefined,
    sameSite: 'none'
  },
};
