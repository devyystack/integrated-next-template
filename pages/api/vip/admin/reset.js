import { Redis } from '@upstash/redis';

const KEY = '3rbvjW4tP0r40MMBSQ0oaks2U2ZnydAA';

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const {
      query: { key },
    } = req;

    if (key !== KEY) {
      res.status(404).send();
      return;
    }

    const cacheKey = `${process.env.PRISMIC_REPOSITORY_NAME}/vip`;

    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });

    const deleted = await redis.del(cacheKey);

    res.status(200).send({ success: true, deleted: new Boolean(deleted) });
    return resolve();
  });
};
