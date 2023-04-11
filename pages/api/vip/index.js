import { Redis } from '@upstash/redis';
import signer from 'nacl-signature';
import { getVipData } from '@/lib/prismic';
import { parseISO, format } from 'date-fns';

export default async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      });

      const cacheKey = `${process.env.PRISMIC_REPOSITORY_NAME}/vip`;
      let data = await redis.get(cacheKey);

      if (!data) {
        console.log('VIP MODE ENABLED CHECK CACHE MISS');
        const prismicVipData = await getVipData();
        await redis.set(cacheKey, JSON.stringify(prismicVipData));
        data = prismicVipData;
      }

      const { activated, countdown } = data;

      const countdownSeconds = parseInt(format(parseISO(countdown), 't'));
      const nowSeconds = Math.floor(Date.now() / 1000);
      const remaining = countdownSeconds - nowSeconds;

      const envelope = {
        success: true,
        activated: activated && remaining > 0,
        countdown,
        countdownInt: countdownSeconds * 1000,
        remaining: remaining > 0 ? remaining : 0,
      };

      const signature = signer.sign(
        JSON.stringify(envelope),
        process.env.KEY_SECRET
      );

      res.status(200).send({ ...envelope, signature });
      return resolve();
    } catch (e) {
      const envelope = {
        success: true,
        activated: false,
        countdown: 0,
        countdownInt: 0,
        remaining: 0,
      };
      const signature = signer.sign(
        JSON.stringify(envelope),
        process.env.KEY_SECRET
      );
      res.status(200).send({
        ...envelope,
        signature,
      });
    }
  });
};
