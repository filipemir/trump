function isEmoji(str) {
  const regEx = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/;
  return regEx.test(str);
}

export { isEmoji };
