import * as types from '../../types/auth/index'
export const startLogin = (username, password) => ({
    type: types.AUTHENTICATION_STARTED,
    payload: { username, password },
  });
  
export const completeLogin = token => ({
type: types.AUTHENTICATION_COMPLETED,
payload: { token },
});

export const failLogin = error => ({
type: types.AUTHENTICATION_FAILED,
payload: { error },
});

export const logout = () => ({
type: types.AUTHENTICATION_IDENTITY_CLEARED,
});

export const startRegister = (email, password1, password2, universityid) => ({
    type: types.REGISTER_STARTED,
    payload: { email, password1, password2, universityid},
})
  
export const completeRegister = token => ({
type: types.REGISTER_COMPLETED,
payload: { token },
})

export const failRegister = error => ({
type: types.REGISTER_FAILED,
payload: { error },
})


export const startTokenRefresh = () => ({
    type: types.TOKEN_REFRESH_STARTED,
  });
  
export const completeTokenRefresh = newToken => ({
type: types.TOKEN_REFRESH_COMPLETED,
payload: { newToken },
});

export const failTokenRefresh = error => ({
type: types.TOKEN_REFRESH_FAILED,
payload: { error },
});
