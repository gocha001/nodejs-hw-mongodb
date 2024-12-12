// src/utils/parseFilterParams.js

const parseFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'string';

  if (!isBoolean) return;
  const isParseFavourite = (isFavourite) =>
    ['true', 'false'].includes(isFavourite);

  if (isParseFavourite(isFavourite)) return isFavourite;
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';

  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedFavourite,
    contactType: parsedContactType,
  };
};
