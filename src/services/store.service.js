const saveRequestError = (commit, nameCommit, error, errorObj) => {
  if (error instanceof errorObj) {
    commit(nameCommit, {
      errorCode: error.errorCode,
      errorMessage: error.message,
    });
  }
};

export default saveRequestError;
