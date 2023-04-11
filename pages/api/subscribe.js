import Mailchimp from 'mailchimp-api-v3';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const mailchimp = new Mailchimp(process.env.MC_KEY);
      const listId = 'd19cac929b';
      const { body } = req;
      const { first_name, last_name, email_address = null } = body;

      if (email_address === null) {
        return res.status(200).send({
          success: false,
          result: 'Missing email addresss.',
        });
      }

      mailchimp
        .post(`lists/${listId}`, {
          members: [
            {
              merge_fields: {
                FNAME: first_name,
                LNAME: last_name,
              },
              email_address: email_address,
              status: 'subscribed',
            },
          ],
        })
        .then(({ new_members }) => {
          if (new_members.length > 0) {
            return res.status(200).send({
              success: true,
              result: 'Added Entry to List.',
            });
          } else {
            return res.status(200).send({
              success: true,
              result: 'Duplicate Mailing List Entry.',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(200).send({
            success: false,
          });
        });

      return resolve();
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
      return resolve();
    }
  });
};
