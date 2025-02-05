export const Authentication = {
    login: '/users/login/',
    register: '/users/register/',
    verifyToken: '/users/token/verify/',
    refreshToken: '/users/token/refresh/',
    otpVerification: '/users/verify-otp/',
    resendOtp: '/users/resend-otp/',
    requestPasswordReset: '/users/request-password-reset/',
    resetPassword: '/users/reset-password/',
    googleAuth: '/users/google-auth/',
    logout:'/users/logout/'
};

export const User = {
    getUserById: (userId) => `/users/${userId}`,
    loggedInUserInfo :'/users/userInfo'
};

export const Post = {
    createPost: '/posts/create/',
    getPost: '/posts',
    updatePost: (postId) => `/posts/${postId}/update/`,
    deletePost: (postId) => `/posts/${postId}/delete/`,
    getPostById: (postId) => `/posts/${postId}/`,
    regeneratePostSection: (postId) => `/posts/${postId}/regenerate-content/`,
    generateAIContent:(postId)=>`/posts/${postId}/generate-ai-content/`,
    chatPrompt: (postId) => `/posts/${postId}/chat/`,
    getPrompts:(postId)=>`/posts/${postId}/prompts/`
};
