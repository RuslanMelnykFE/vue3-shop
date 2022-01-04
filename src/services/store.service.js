const saveRequestError = (commit, nameCommit, error, errorObj) => {
  if (error instanceof errorObj) {
    commit(nameCommit, {
      errorCode: error.errorCode,
      errorMessage: error.message,
    });
  }
};

const getPropsData = (props) => {
  const propsKeys = Object.keys(props);
  return propsKeys.reduce(
    (accum, propsKey) => ({ ...accum, [`props[${propsKey}]`]: props[propsKey] }),
    {},
  );
};

const formatteParams = (params) => {
  const {
    categoryId, page, limit, minPrice, maxPrice, categoryProps,
  } = params;

  if (!categoryProps) {
    return params;
  }

  const propsData = getPropsData(categoryProps);

  return {
    categoryId,
    page,
    limit,
    minPrice,
    maxPrice,
    ...propsData,
  };
};

export { saveRequestError, formatteParams };
