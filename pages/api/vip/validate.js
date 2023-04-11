import { Redis } from '@upstash/redis';
import { get } from 'lodash';
import signer from 'nacl-signature';
import { getVipData } from '@/lib/prismic';
import { TRUE } from 'sass';

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const requestData = get(req, 'body', null);
    const { code } = requestData;
    const cacheKey = `${process.env.PRISMIC_REPOSITORY_NAME}/vip`;

    if (!code) {
      res
        .status(200)
        .send({ success: false, validated: false, error: 'Missing code' });
      return;
    }
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });

    let data = await redis.get(cacheKey);

    if (!data) {
      console.log('CODE VALIDATE CACHE MISS');
      const prismicVipData = await getVipData();
      await redis.set('vip', JSON.stringify(prismicVipData));
      data = prismicVipData;
    }

    const { customer_code, countdown, vip_banner_message } = data;

    const result = customer_code[0].text.toLowerCase() === code.toLowerCase();
    const nowSeconds = Math.floor(Date.now() / 1000);

    const envelope = {
      success: true,
      date: nowSeconds,
      validated: result,
      vip_banner_message,
      countdown,
      error: result ? false : 'Invalid code',
    };

    const signature = signer.sign(
      JSON.stringify(envelope),
      process.env.KEY_SECRET
    );

    res.status(200).send({ ...envelope, signature });
    return resolve();
  });
};
