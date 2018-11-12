module.exports = {
  'database': 'mongodb://gooplus:nkasndasdTY54TGa@ds145790.mlab.com:45790/gooplus',
  'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
  'api_user': 'YOUR SENDGRID USERNAME',
  'api_key': 'YOUR SENDGRID PASSWORD',
  'jwtExpire': '72h' //set the jwtExpire in smaller period in production
};
