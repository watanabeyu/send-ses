/* vars */
const aws = require('aws-sdk')
const email = "xxxxxxx@fromyourmail"

exports.handle = function(event, context, cb) {
  const ses = new aws.SES({ apiVersion: '2010-12-01' })

  const to = (event.to instanceof Array) ? event.to : [event.to]

  const params = {
    Destination: {
      ToAddresses: to
    },
    Message: {
      Subject: {
        Data: event.title
      },
      Body: {
        Text: {
          Data: event.body
        }
      }
    },
    Source: email
  }

  ses.sendEmail(params, function(error, data) {
    if (error) {
      cb(error);
    } else {
      cb(null, { success: true });
    }
  })
}
