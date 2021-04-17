export const getUrl = (url) => {
  return `${process.env.S3_URL}/${url}`;
}
